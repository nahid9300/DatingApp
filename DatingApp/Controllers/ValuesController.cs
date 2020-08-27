using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        public ValuesController(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _dbContext.Values.ToListAsync();
            return Ok(values);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValues(int id)
        {
            var value =await _dbContext.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);
        }

    }
}
