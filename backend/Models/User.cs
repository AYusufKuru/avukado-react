// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace Avukado.Api.Models;

public class User
{
    public int Id { get; set; }
    [Required, EmailAddress] public string Email { get; set; } = "";
    [Required] public string Name { get; set; } = "";
    [Required] public string PasswordHash { get; set; } = "";
    public string Role { get; set; } = "muvekkil"; // muvekkil | avukat | admin
}