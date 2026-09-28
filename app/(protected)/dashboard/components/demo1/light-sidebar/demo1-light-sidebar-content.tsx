import {
  EarningsChart,
  EntityCounts,
  EntryCallout,
  Highlights,
  SupportMembers,
  Teams,
} from './components';

export function Demo1LightSidebarContent() {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-5 lg:gap-7.5 h-full items-stretch">
            <EntityCounts />
          </div>
        </div>
        <div className="lg:col-span-2">
          <EntryCallout className="h-full" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <Highlights limit={3} />
        </div>
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <SupportMembers />
        </div>
        <div className="lg:col-span-2">
          <Teams />
        </div>
      </div>
    </div>
  );
}
