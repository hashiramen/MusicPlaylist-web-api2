using MusicPlaylist.Infrastructure.Commands;
using MusicPlaylist.Infrastructure.Commands.Authenticators;
using MusicPlaylist.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Handlers.Songs
{
    public class RemoveSongHandler : ICommandHandler<RemoveSong>
    {
        private readonly ISongService _songService;
        public RemoveSongHandler(ISongService songSerivce)
        {
            _songService = songSerivce;
        }

        public async Task HandleAsync(RemoveSong command)
        {
            await _songService.RemoveAsync(command.id, command.playlistId);
        }
    }
}
