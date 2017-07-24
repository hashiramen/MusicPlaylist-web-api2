using MusicPlaylist.Infrastructure.Commands;
using MusicPlaylist.Infrastructure.Commands.Authenticators;
using MusicPlaylist.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MusicPlaylist.App.Controllers
{
    [RoutePrefix("api/authenticators")]
    public class AuthenticatorsController : ApiBaseController
    {
        private readonly IAuthenticatorService _authenService;
        public AuthenticatorsController(IAuthenticatorService authenService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _authenService = authenService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var authenticators = await _authenService.GetAllAsync();
            return Json(authenticators);
        }

        [Route("{tag}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(string tag)    
        {
            var result = await _authenService.GetAsync(tag);
            if(result == null)
            {
                return NotFound();
            }
            return Json(result);
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]CreateAuthenticator command)
        {
            await _CommandDispatcher.DispatchAsync(command);

            var authenticator = await _authenService.GetAsync(command.Tag);

            return Created($"api/authenticators/{command.Tag}", authenticator);
        }
    }
}
