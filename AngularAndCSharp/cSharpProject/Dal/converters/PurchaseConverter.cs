using Dal.Models;
using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.converters
{
    public class PurchaseConverter
    {
        // DTO → ENTITY

        public static Purchase ToEntity(DtoPurchase dto)
        {
            if (dto == null)
                return null;

            return new Purchase
            {
                CustomerId = dto.CustomerId,
                PurchaseDate = dto.PurchaseDate,
                TotalAmount = dto.TotalAmount
            };
        }


    }
}
