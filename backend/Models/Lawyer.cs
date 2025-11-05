// Models/Lawyer.cs
namespace Avukado.Api.Models;

public class Lawyer
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Office { get; set; } = "";
    public string City { get; set; } = "";
    public string Baro { get; set; } = "";
    public string Avatar { get; set; } = "";
    public double Rating { get; set; }
    public int Reviews { get; set; }
    public bool Verified { get; set; } = true;
    public string TagsCsv { get; set; } = ""; // "Ceza Hukuku,Aile Hukuku"
}
