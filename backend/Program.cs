using System.Text;
using Avukado.Api.Data;
using Avukado.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// EF Core
builder.Services.AddDbContext<AppDb>(o =>
    o.UseSqlite(builder.Configuration.GetConnectionString("db")));

// CORS (Vite 5173)
builder.Services.AddCors(o =>
{
    o.AddPolicy("vite", p => p
      .WithOrigins("http://localhost:5173")
      .AllowAnyHeader().AllowAnyMethod().AllowCredentials());
});

// JWT
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));
var jwt = builder.Configuration.GetSection("Jwt").Get<JwtOptions>()!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(o =>
  {
      o.TokenValidationParameters = new()
      {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = jwt.Issuer,
          ValidAudience = jwt.Audience,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key))
      };
  });

builder.Services.AddScoped<JwtService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger(); app.UseSwaggerUI();
app.UseCors("vite");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// --- Seed demo data ---
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    db.Database.Migrate();

    if (!db.Lawyers.Any())
    {
        db.Lawyers.AddRange(
          new() { Name = "Av. Zeynep Koç", Office = "Koç Hukuk", City = "Gaziantep", Baro = "88214", Avatar = "https://i.pravatar.cc/150?img=65", Rating = 4.9, Reviews = 62, Verified = true, TagsCsv = "Aile Hukuku,Ceza Hukuku" },
          new() { Name = "Av. Ayşe Demir", Office = "Demir & Ortakları", City = "Ankara", Baro = "51892", Avatar = "https://i.pravatar.cc/150?img=15", Rating = 4.9, Reviews = 105, Verified = true, TagsCsv = "Aile Hukuku,Boşanma" },
          new() { Name = "Av. Ahmet Yılmaz", Office = "Yılmaz Hukuk", City = "İstanbul", Baro = "34567", Avatar = "https://i.pravatar.cc/150?img=12", Rating = 4.8, Reviews = 62, Verified = true, TagsCsv = "Ceza Hukuku,İş Hukuku" }
        );
        db.SaveChanges();
    }
}

app.Run();
