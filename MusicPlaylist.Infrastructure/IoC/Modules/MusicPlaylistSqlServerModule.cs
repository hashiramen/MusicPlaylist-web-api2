using Autofac;
using MusicPlaylist.Infrastructure.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.IoC.Modules
{
    public class MusicPlaylistSqlServerModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<MusicPlaylistContext>().SingleInstance();
        }
    }
}
