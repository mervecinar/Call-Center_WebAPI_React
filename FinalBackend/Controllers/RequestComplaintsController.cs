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
    public class RequestComplaintsController : Controller
    {
        private readonly BLM19417EContext _context;

        public RequestComplaintsController(BLM19417EContext context)
        {
            _context = context;
        }


        // GET: api/RequestComplaints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestComplaint>>> GetEmployees()
        {
            return await _context.RequestComplaints.ToListAsync();
        }

        // GET: api/RequestComplaints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RequestComplaint>> GetEmployee(int id)
        {
            var employee = await _context.RequestComplaints.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/RequestComplaints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, RequestComplaint employee)
        {
            if (id != employee.RequestComplaintId)
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


        // POST: api/RequestComplaints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostEmployee(RequestComplaint student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RequestComplaints.Add(student);
            _context.SaveChanges();

            return Ok(student);
        }








        // DELETE: api/RequestComplaints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.RequestComplaints.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.RequestComplaints.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.RequestComplaints.Any(e => e.RequestComplaintId == id);
        }
    }
}
