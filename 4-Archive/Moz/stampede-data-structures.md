- `Subject`: {scope, target}
- `Keyword Set Spec`: {subject, sort, max_limit}
- `ClusterAwareGenServer.server`: {:clustered, node, GenServer.server}
- `GenServer.server (aka via_tuple)`: {:via, Registry, {registry_name, kw_set_spec}}

- `CollectionSupervisor.Supervisor.ensure_children_started`: %{kw_set_spec => ClusterAwareGenServer.server}

```
%{
  {{:domain, "domain_1.com"}, :primary_rank, 2000} => {
    :clustered,
    :nonode@nohost,
    {:via, Registry, {:"test returns an error when the requested range is fully out ...", {{:domain, "domain_1.com"}, :primary_rank, 2000}}}
  }, 
  {{:domain, "domain_2.com"}, :primary_rank, 2000} => {
    :clustered, :nonode@nohost, {:via, Registry, {:"test re...", {{:domain, "domain_2.com"}, :primary_rank, 2000}}}
  }
}
```

## Related

- [[Moz MOC]]
