using Dal.Models;
using Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        IBll.BllInterface e;
        public EventController(IBll.BllInterface e)
        {
            this.e = e;
        }

        [HttpGet]
        public async Task<List<DtoEvent>> GetEventAsync()
        {
            return await e.GetAllEvents();
        }

        [HttpGet("byCategory")]
        public async Task<ActionResult<IEnumerable<DtoEvent>>> GetEventByCategoryId([FromQuery] int? categoryId)
        {
            var events = await e.GetEventByCategoryId(categoryId);
            if (events == null || !events.Any())
            {
                return NoContent();
            }
            return Ok(events);
        }

        [HttpPost("ProcessCart")]
        public IActionResult ProcessCart([FromBody] Purchase payload)
        {
            try
            {
                return Ok(new
                {
                    success = true,
                    message = "הרכישה בוצעה בהצלחה",
                    orderId = Guid.NewGuid().ToString(),
                    totalAmount = payload.TotalAmount
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing purchase: {ex.Message}");
                return BadRequest(new
                {
                    success = false,
                    message = "שגיאה בעיבוד הרכישה: " + ex.Message
                });
            }
        }
    }
}

