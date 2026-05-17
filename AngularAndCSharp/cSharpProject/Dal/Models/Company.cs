using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Company
{
    public int CompanyId { get; set; }

    public string CompanyName { get; set; } = null!;

    public string? ContactEmail { get; set; }

    public string? Phone { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}
