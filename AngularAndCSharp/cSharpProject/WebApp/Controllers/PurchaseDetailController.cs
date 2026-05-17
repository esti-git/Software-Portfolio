using Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseDetailController : ControllerBase
    {

        private readonly IBll.BllInterface _bll;

        public PurchaseDetailController(IBll.BllInterface bll)
        {
            this._bll = bll;
        }

        [HttpPost]
        public async Task<IActionResult> AddPurchaseDetail([FromBody] DtoPurchaseDetails purchaseDetails)
        {
            try
            {
                await _bll.AddPurchaseDetail(purchaseDetails);
                return Ok("purchase details added successfully");
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
