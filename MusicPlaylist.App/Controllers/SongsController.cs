﻿using MusicPlaylist.Infrastructure.Commands;
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
    [RoutePrefix("api/songs")]
    public class SongsController : ApiBaseController
    {
        private readonly ISongService _songService;
        public SongsController(ICommandDispatcher commandDispatcher, ISongService songService) : base(commandDispatcher)
        {
            _songService = songService;
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]AddSong command)
        {
            await _CommandDispatcher.DispatchAsync(command);

            return Created($"to/be/changed", new object());
        }
    }
}