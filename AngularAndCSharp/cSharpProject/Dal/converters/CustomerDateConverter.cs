using Dal.Models;
using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.converters
{
    internal class CustomerDateConverter
    {
        public static DtoCustomerDate ToDto(Models.Customer c)
        {
            if (c == null)
                return null;

            return new DtoCustomerDate
            {
                email = c.Email,
                CreatedAt = c.CreatedAt
            };
        }





    }
}
