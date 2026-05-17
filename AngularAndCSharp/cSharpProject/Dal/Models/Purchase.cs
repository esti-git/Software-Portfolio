using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Purchase
{
    public int PurchaseId { get; set; }

    public int? CustomerId { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public decimal TotalAmount { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<PurchaseDetail> PurchaseDetails { get; set; } = new List<PurchaseDetail>();
}
