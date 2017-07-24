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
    [RoutePrefix("api/playlists")]
    public class PlaylistsController : ApiBaseController
    {
        private readonly IPlaylistService _playlistService;
        private readonly ICommandDispatcher _commandDispatcher;
        public PlaylistsController(IPlaylistService playlistService, ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _playlistService = playlistService;
            _commandDispatcher = commandDispatcher;
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var playlist = await _playlistService.GetAsync(id);
            if(playlist == null)
            {
                return NotFound();
            }

            return Json(playlist);
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]CreatePlaylist command)
        {
            await _commandDispatcher.DispatchAsync(command);

            var playlist = await _playlistService.GetLatesAddedAsync();

            return Created($"api/playlists/{command.Id}", playlist);
        }
    }
}
