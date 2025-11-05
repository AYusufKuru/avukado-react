namespace Avukado.Api.Dtos;

public record LawyerListItem(
  int Id, string Name, string Office, string City, string Baro,
  string Avatar, double Rating, int Reviews, bool Verified, IEnumerable<string> Tags
);
