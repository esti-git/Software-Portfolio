using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerDateController : ControllerBase

    {
        private readonly IBll.BllInterface _bll;

        public CustomerDateController(IBll.BllInterface bll)
        {
            this._bll = bll;
        }

        [HttpGet("createdate/{email}")]
        public async Task<IActionResult> GetCustomerCreateDate(string email)
        {
            var result = await _bll.GetCustomerDateByEmail(email);

            if (result == null)
                return NotFound("Customer not found or CreateDate is null");

            return Ok(result);
        }
    }
}
