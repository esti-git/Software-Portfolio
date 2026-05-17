using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Dto;
using System.Threading.Tasks;
namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IBll.BllInterface _bll;

        public CustomerController(IBll.BllInterface bll)
        {
            this._bll = bll;
        }

       [HttpGet("byEmail/{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var customer = await _bll.GetCustomerByEmail(email);

            if (customer == null)
                return NotFound();

            return Ok(customer);
        }


        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody] DtoCustomer customer)
        {
            try
            {
                await _bll.AddCustomer(customer);
                return Ok("Customer added successfully");
            }
        
            catch (Exception ex)
            {
                if (ex.Message == "EXISTS")
                    return Conflict("User already exists");

                return BadRequest(ex.Message);
            }
        }
    }
}
