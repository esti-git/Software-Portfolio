using Dto; 
using IBll;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class CategoryController : ControllerBase
    {
        private readonly IBll.BllInterface _bll;

        public CategoryController(IBll.BllInterface bll)
        {
            this._bll = bll;
        }


        [HttpGet]
        public async Task<List<DtoCategory>> GetCategoriesAsync()
        {
            return await _bll.GetAllCategories();
        }

    }
}