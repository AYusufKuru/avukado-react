using Avukado.Api.Data;
using Avukado.Api.Dtos;
using Avukado.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Avukado.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdsController : ControllerBase
{
    private readonly AppDb _db;
    public AdsController(AppDb db) { _db = db; }

    [HttpGet]
    public async Task<IEnumerable<object>> List([FromQuery] string? city)
    {
        var q = _db.Ads.Include(a => a.Proposals).AsQueryable();
        if (!string.IsNullOrEmpty(city)) q = q.Where(a => a.City == city);
        var list = await q.OrderByDescending(a => a.Id).Take(100).ToListAsync();
        return list.Select(a => new
        {
            a.Id,
            a.Title,
            a.Description,
            a.City,
            a.CreatedAt,
            bids = a.Proposals.Count
        });
    }

    [Authorize] // giriş gerekli
    [HttpPost]
    public async Task<ActionResult<object>> Create(CreateAdDto dto)
    {
        var ad = new Ad { Title = dto.Title, Description = dto.Description, City = dto.City };
        _db.Ads.Add(ad);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = ad.Id }, new { ad.Id, ad.Title, ad.City, ad.Description });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<object>> Get(int id)
    {
        var ad = await _db.Ads.Include(x => x.Proposals).FirstOrDefaultAsync(x => x.Id == id);
        if (ad == null) return NotFound();
        return new { ad.Id, ad.Title, ad.Description, ad.City, bids = ad.Proposals.Count };
    }

    [Authorize(Roles = "avukat")]
    [HttpPost("{id}/proposals")]
    public async Task<ActionResult> AddProposal(int id, ProposalDto dto)
    {
        var ad = await _db.Ads.FindAsync(id);
        if (ad == null) return NotFound();
        _db.Proposals.Add(new Proposal { AdId = ad.Id, Price = dto.Price, LawyerId = 0 });
        await _db.SaveChangesAsync();
        return Ok(new { message = "Teklif verildi" });
    }

    [Authorize(Roles = "muvekkil,admin")]
    [HttpPost("{adId}/proposals/{pid}/{status}")] // accepted|rejected
    public async Task<ActionResult> SetStatus(int adId, int pid, string status)
    {
        var prop = await _db.Proposals.FirstOrDefaultAsync(p => p.Id == pid && p.AdId == adId);
        if (prop == null) return NotFound();
        prop.Status = status;
        await _db.SaveChangesAsync();
        return Ok(new { message = "Güncellendi" });
    }
}
