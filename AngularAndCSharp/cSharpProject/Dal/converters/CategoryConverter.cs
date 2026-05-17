using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dto;

namespace Dal.converters
{
    public static class CategoryConverter
    {
        public static DtoCategory ToDto(Models.Category category)
        {
            return new DtoCategory
            {
                category_id = category.CategoryId,
                category_name = category.CategoryName
            };
        }

        public static List<DtoCategory> ToDtoList(List<Models.Category> list)
        {
            return list.Select(c => ToDto(c)).ToList();
        }
    }
}