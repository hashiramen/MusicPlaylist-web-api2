using AutoMapper;
using MusicPlaylist.Core.Domain;
using MusicPlaylist.Infrastructure.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Mappers
{
    public class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Authenticator, AuthenticatorDto>();
                cfg.CreateMap<Playlist, PlaylistDto>();
                cfg.CreateMap<Song, SongDto>();
            })
            .CreateMapper();
    }
}
