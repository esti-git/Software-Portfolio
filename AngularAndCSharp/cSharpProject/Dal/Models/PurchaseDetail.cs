using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class PurchaseDetail
{
    public int DetailId { get; set; }

    public int? PurchaseId { get; set; }

    public int? ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Event? Product { get; set; }

    public virtual Purchase? Purchase { get; set; }
}
