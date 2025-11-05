namespace Avukado.Api.Dtos;

public record LoginDto(string Email, string Password);
public record RegisterDto(string Name, string Email, string Password);
public record AuthResponse(string Token, object User);
