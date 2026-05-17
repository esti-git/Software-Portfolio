using Dal.Models;
using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.converters
{
    internal class CustomerConverter
    {


        // DTO → ENTITY

        public static Customer ToEntity(DtoCustomer dto)
        {
            if (dto == null)
                return null;

            return new Customer
            {
                CustomerId = dto.CustomerId,
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password,
                CreatedAt = dto.CreatedAt
            };
        }


        // ENTITY → DTO
        public static DtoCustomer ToDto(Customer c)
        {
            if (c == null)
                return null;

            return new DtoCustomer
            {
                CustomerId = c.CustomerId,
                Username = c.Username,
                Email = c.Email,
                Password = c.Password,
                CreatedAt = c.CreatedAt,


            };
        }



        // ENTITY LIST → DTO LIST
        public static List<DtoCustomer> ToDtoList(List<Customer> entities)
        {
            var list = new List<DtoCustomer>();

            foreach (var item in entities)
                list.Add(ToDto(item));

            return list;
        }
      
    }
}
