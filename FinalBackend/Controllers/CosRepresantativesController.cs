using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalBackEnd.Models;
using System.Reflection;

namespace FinalBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CosRepresantativesController : Controller
    {
        private readonly BLM19417EContext _context;

        public CosRepresantativesController(BLM19417EContext context)
        {
            _context = context;
        }


        // GET: api/CosRepresantatives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CosRepresantative>>> GetEmployees()
        {
            return await _context.CosRepresantatives.ToListAsync();
        }

        // GET: api/CosRepresantatives/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CosRepresantative>> GetEmployee(int id)
        {
            var employee = await _context.CosRepresantatives.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/CosRepresantatives/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, CosRepresantative employee)
        {
            if (id != employee.CosRepresantativeId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/CosRepresantatives
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostEmployee(CosRepresantative student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");


            _context.CosRepresantatives.Add(new CosRepresantative()
            {
                CosRepresantativeId = student.CosRepresantativeId,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Country = student.Country,
                DepartmentId=student.DepartmentId
            });

            _context.SaveChanges();
            return Ok();
        }

             
         





            // DELETE: api/CosRepresantatives/5
            [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.CosRepresantatives.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.CosRepresantatives.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.CosRepresantatives.Any(e => e.CosRepresantativeId == id);
        }
    }
}
