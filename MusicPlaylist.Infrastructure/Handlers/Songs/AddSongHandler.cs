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
    public class AddSongHandler : ICommandHandler<AddSong>
    {
        private readonly ISongService _songService;
        public AddSongHandler(ISongService songService)
        {
            _songService = songService;
        }

        public async Task HandleAsync(AddSong command)
        {
            await _songService.AddAsync(command.url, command.playlistId);
        }
    }
}
