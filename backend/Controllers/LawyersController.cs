using Avukado.Api.Data;
using Avukado.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Avukado.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LawyersController : ControllerBase
{
    private readonly AppDb _db;
    public LawyersController(AppDb db) { _db = db; }

    [HttpGet]
    public async Task<IEnumerable<LawyerListItem>> List([FromQuery] string? q, [FromQuery] string? city, [FromQuery] string? tag)
    {
        var query = _db.Lawyers.AsQueryable();
        if (!string.IsNullOrWhiteSpace(q)) query = query.Where(x => x.Name.Contains(q) || x.Office.Contains(q));
        if (!string.IsNullOrWhiteSpace(city)) query = query.Where(x => x.City == city);
        if (!string.IsNullOrWhiteSpace(tag)) query = query.Where(x => x.TagsCsv.Contains(tag));

        var list = await query.OrderByDescending(x => x.Rating).Take(60).ToListAsync();
        return list.Select(x => new LawyerListItem(
          x.Id, x.Name, x.Office, x.City, x.Baro, x.Avatar, x.Rating, x.Reviews, x.Verified,
          x.TagsCsv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
        ));
    }
}
