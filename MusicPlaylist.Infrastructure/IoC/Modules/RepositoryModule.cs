﻿using Autofac;
using MusicPlaylist.Core.Repositories;
using MusicPlaylist.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.IoC.Modules
{
    public class RepositoryModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = typeof(RepositoryModule)
                .GetTypeInfo()
                .Assembly;

            builder.RegisterAssemblyTypes(assembly)
                    .Where(x => x.IsAssignableTo<IRepository>())
                    .AsImplementedInterfaces()
                    .InstancePerLifetimeScope();
            //builder.RegisterType<AuthenticatorRepository>().As<IAuthenticatorRepository>().SingleInstance();
        }
    }
}
