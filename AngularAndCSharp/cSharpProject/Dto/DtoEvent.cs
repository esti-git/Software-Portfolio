namespace Dto
{
    public class DtoEvent
    {

        public int ProductId { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime EventDate { get; set; }

        public string Location { get; set; } = null!;

        public int? AgeMin { get; set; }

        public int? CategoryId { get; set; }

        public int? CompanyId { get; set; }

        public decimal Price { get; set; }

        public DateTime? CreatedAt { get; set; }

        public string? ImageUrl { get; set; }

    }
}
