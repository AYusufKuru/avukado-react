using Avukado.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Avukado.Api.Data;

public class AppDb : DbContext
{
    public AppDb(DbContextOptions<AppDb> options) : base(options) { }
    public DbSet<User> Users => Set<User>();
    public DbSet<Lawyer> Lawyers => Set<Lawyer>();
    public DbSet<Ad> Ads => Set<Ad>();
    public DbSet<Proposal> Proposals => Set<Proposal>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>().HasIndex(x => x.Email).IsUnique();
        b.Entity<Lawyer>().Property(p => p.Rating).HasDefaultValue(4.8);
    }
}
