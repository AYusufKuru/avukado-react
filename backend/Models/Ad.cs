// Models/Ad.cs
namespace Avukado.Api.Models;

public class Ad
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string City { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<Proposal> Proposals { get; set; } = new();
}

public class Proposal
{
    public int Id { get; set; }
    public int AdId { get; set; }
    public Ad? Ad { get; set; }
    public int LawyerId { get; set; }
    public Lawyer? Lawyer { get; set; }
    public decimal Price { get; set; }
    public string Status { get; set; } = "pending"; // pending|accepted|rejected
}