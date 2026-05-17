using Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {

        private readonly IBll.BllInterface _bll;

        public PurchaseController(IBll.BllInterface bll)
        {
            this._bll = bll;
        }

        [HttpPost]
        public async Task<IActionResult> AddPurchase([FromBody] DtoPurchase purchase)
        {
            try
            {
                await _bll.AddPurchase(purchase);
                return Ok("purchase added successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
