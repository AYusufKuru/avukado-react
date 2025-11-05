using Avukado.Api.Data;
using Avukado.Api.Dtos;
using Avukado.Api.Models;
using Avukado.Api.Services;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Avukado.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDb _db;
    private readonly JwtService _jwt;
    public AuthController(AppDb db, JwtService jwt) { _db = db; _jwt = jwt; }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(x => x.Email == dto.Email))
            return Conflict(new { message = "E-posta kayıtlı" });

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        var token = _jwt.Create(user);
        return new AuthResponse(token, new { id = user.Id, name = user.Name, email = user.Email });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginDto dto)
    {
        var u = await _db.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
        if (u == null || !BCrypt.Net.BCrypt.Verify(dto.Password, u.PasswordHash))
            return Unauthorized(new { message = "Geçersiz bilgiler" });

        var token = _jwt.Create(u);
        return new AuthResponse(token, new { id = u.Id, name = u.Name, email = u.Email });
    }
}
