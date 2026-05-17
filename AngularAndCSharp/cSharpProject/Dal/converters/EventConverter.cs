using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.converters
{
    public class EventConverter
    {
        // המרה של אירוע (Event) ל-DtoEvent
        public static DtoEvent ToDto(Models.Event e)
        {
            DtoEvent tnew = new DtoEvent();

            tnew.ProductId = e.ProductId;
            tnew.Name = e.Name;
            tnew.Description = e.Description;
            tnew.EventDate = e.EventDate;
            tnew.Location = e.Location;
            tnew.AgeMin = e.AgeMin;
            tnew.CategoryId = e.CategoryId;
            tnew.CompanyId = e.CompanyId;
            tnew.Price = e.Price;
            tnew.CreatedAt = e.CreatedAt;
            tnew.ImageUrl = e.ImageUrl;

            return tnew;
        }

        // המרה של רשימת אירועים
        public static List<DtoEvent> ToDtoList(List<Models.Event> list)
        {
            List<DtoEvent> result = new List<DtoEvent>();

            foreach (var item in list)
            {
                result.Add(ToDto(item));
            }

            return result;
        }
    
}
}
