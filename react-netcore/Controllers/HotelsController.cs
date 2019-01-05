using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using react_netcore.Data;

namespace react_netcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        Random rnd = new Random();
        static List<Hotel> hotels = new List<Hotel>();
        List<string> lorems = new List<string>
            {
                "Lorem ipsum dolor sit amet",
                "Ignota rationibus definitionem at mei",
                "Utroque splendide sea ad, usu te quem possim",
                "In eam iriure persius delicata, mel elit congue evertitur ei.",
                "Mea magna nobis an, dolorum meliore assentior et vix"
            };


        public HotelsController()
        {
            if (!hotels.Any())
            {
                for (int i = 1; i < 20; i++)
                {
                    hotels.Add(new Hotel { HotelId = i, Name = $"hotel {i}", Description = lorems[rnd.Next(0, lorems.Count)] });
                };
            }
        }

        // GET: api/Hotels
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(hotels);

        }

        // GET: api/Hotels/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var hotel = hotels.FirstOrDefault(x => x.HotelId == id);
            if (hotel == null)
            {
                return BadRequest();
            }
            return Ok(hotel);
           
        }

        // POST: api/Hotels
        [HttpPost]
        public IActionResult Post([FromBody] Hotel hotel)
        {
            hotels.Add(hotel);
            return StatusCode(201);
        }

        // PUT: api/Hotels/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Hotel editHotel)
        {
            var hotel = hotels.FirstOrDefault(x => x.HotelId == id);
            if (hotel == null)
            {
                return BadRequest();
            }
            hotel.HotelId = editHotel.HotelId;
            hotel.Name = editHotel.Name;
            hotel.Description = editHotel.Description;

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var hotel = hotels.FirstOrDefault(x => x.HotelId == id);
            if (hotel == null)
            {
                return BadRequest();
            }
            hotels.Remove(hotel);

            return NoContent();
        }
    }
}
