using Dal.Models;
using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.converters
{
    public class PurchaseDetailConverter
    {
        // DTO → ENTITY

        public static PurchaseDetail ToEntity(DtoPurchaseDetails dto)
        {
            if (dto == null)
                return null;

            return new PurchaseDetail
            {
                PurchaseId = dto.PurchaseId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                Price = dto.Price

            };
        }
    }
}
