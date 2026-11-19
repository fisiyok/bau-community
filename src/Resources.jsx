import React, { useState } from 'react';
import { ArrowRight, CalendarDays, Check, Clock3, Coffee, MapPin, Music2, Plus, Search, Ticket, X } from 'lucide-react';
import './Resources.css';

const categories = ['All picks', 'Events & markets', 'Music & culture', 'Happy hours'];

const starterResources = [
  { id: 1, category: 'Events & markets', title: 'Downtown Holiday Market', venue: 'F Street, between 7th & 9th NW · Penn Quarter', date: 'Nov 20 – Dec 23', time: 'Weekdays 12–8 PM · weekends 11 AM–8 PM', detail: 'A festive outdoor market with local makers, gifts, food stalls, and warm drinks. Easy Metro ride from campus.', host: 'DC Community Picks', initials: 'DC', color: 'green', label: 'Seasonal favorite' },
  { id: 2, category: 'Music & culture', title: 'Salsa on the Plaza', venue: 'La Cosecha, Union Market', date: 'Sat, Nov 28', time: '6:30 PM · beginner lesson at 6', detail: 'An easygoing evening of Latin music and dancing. Come with friends or join a beginner lesson when you arrive.', host: 'Sofia Reyes', initials: 'SR', color: 'coral', label: 'Music & dance' },
  { id: 3, category: 'Music & culture', title: 'Go-go night at The Wharf', venue: 'The Anthem plaza · Southwest Waterfront', date: 'Fri, Dec 4', time: '7:00 PM', detail: 'Catch a local go-go showcase, then walk the waterfront. Check the venue listing for the latest event details.', host: 'Marcus Reed', initials: 'MR', color: 'gold', label: 'Live music' },
  { id: 4, category: 'Happy hours', title: 'The Coupe · Columbia Heights', venue: '3415 11th St NW', date: 'Mon–Fri', time: '4–6:30 PM', detail: 'Neighborhood spot with a relaxed bar, snacks, and weekday drink specials. About 10 minutes from campus by Metro.', host: 'Amina Okafor', initials: 'AO', color: 'coral', label: 'Student favorite' },
  { id: 5, category: 'Happy hours', title: 'Right Proper Brewing · Shaw', venue: '624 T St NW', date: 'Weekdays', time: '4–6 PM', detail: 'Local brewery taproom with a rotating list and a laid-back group hangout feel. Bring a campus ID and check current specials.', host: 'Jordan Lee', initials: 'JL', color: 'blue', label: 'Near campus' },
  { id: 6, category: 'Events & markets', title: 'Eastern Market weekend stroll', venue: '225 7th St SE · Capitol Hill', date: 'Sat & Sun', time: '9 AM–3 PM', detail: 'Browse the outdoor flea market, grab something from the food vendors, and explore the neighborhood.', host: 'Priya Shah', initials: 'PS', color: 'gold', label: 'Weekend outing' },
];

const categoryIcon = (category) => {
  if (category === 'Music & culture') return Music2;
  if (category === 'Happy hours') return Coffee;
  return Ticket;
};

function Resources({ onNotice }) {
  const [resources, setResources] = useState(starterResources);
  const [filter, setFilter] = useState('All picks');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredResources = resources.filter((resource) =>
    (filter === 'All picks' || resource.category === filter) &&
    `${resource.title} ${resource.venue} ${resource.detail} ${resource.category}`.toLowerCase().includes(search.toLowerCase()),
  );

  const addResource = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get('title')?.trim();
    if (!title) return;
    const category = form.get('category');
    setResources([{
      id: Date.now(),
      category,
      title,
      venue: form.get('venue')?.trim() || 'Washington, D.C.',
      date: form.get('date')?.trim() || 'Date to be confirmed',
      time: form.get('time')?.trim() || 'Check event details',
      detail: form.get('detail')?.trim() || 'Shared by a BAU community member.',
      host: 'Jamie Davis',
      initials: 'JD',
      color: 'green',
      label: 'Community post',
    }, ...resources]);
    setFilter('All picks');
    setSearch('');
    setModalOpen(false);
    onNotice('Your DC resource is now posted.');
  };

  return (
    <section className="resources-page">
      <header className="page-heading">
        <div>
          <div className="eyebrow"><MapPin size={13} /> OUTSIDE THE CLASSROOM</div>
          <h1>DC Resources<span className="heading-period">.</span></h1>
          <p>Good things happening around the city, shared by the BAU community.</p>
        </div>
        <button className="primary-button" onClick={() => setModalOpen(true)}><Plus size={17} /> Add a resource</button>
      </header>

      <div className="resource-intro">
        <div className="resource-intro-mark"><CalendarDays size={23} /></div>
        <div><span>YOUR CITY, YOUR COMMUNITY</span><h2>Make a little room for D.C.</h2><p>Seasonal markets, neighborhood culture, and good spots for after class.</p></div>
        <span className="resource-intro-note">COMMUNITY PICKS · DEMO LISTINGS</span>
      </div>

      <div className="resource-controls">
        <div className="filter-tabs">{categories.map((category) => <button key={category} className={filter === category ? 'selected' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div>
        <label className="resource-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search D.C. picks" aria-label="Search D.C. resources" /></label>
      </div>

      <div className="resource-grid">
        {filteredResources.map((resource) => {
          const Icon = categoryIcon(resource.category);
          return <article className={`resource-card resource-${resource.color}`} key={resource.id}>
            <div className="resource-card-top"><span className="resource-icon"><Icon size={18} /></span><span className="resource-label">{resource.label}</span><button aria-label={`Save ${resource.title}`} onClick={() => onNotice('Resource saved to your favorites.')} className="resource-save">♡</button></div>
            <span className="resource-category">{resource.category}</span>
            <h2>{resource.title}</h2>
            <div className="resource-venue"><MapPin size={14} />{resource.venue}</div>
            <div className="resource-schedule"><span><CalendarDays size={14} />{resource.date}</span><span><Clock3 size={14} />{resource.time}</span></div>
            <p className="resource-detail">{resource.detail}</p>
            <div className="resource-card-footer"><span className="resource-author"><i>{resource.initials}</i>{resource.host}</span><button onClick={() => onNotice(`${resource.title} · ${resource.venue}`)}>Details <ArrowRight size={14} /></button></div>
          </article>;
        })}
        {filteredResources.length === 0 && <div className="empty-state">No D.C. picks match this search yet.</div>}
      </div>

      {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}><section className="modal resource-modal" role="dialog" aria-modal="true" aria-labelledby="resource-modal-title">
        <div className="modal-heading"><div><span className="eyebrow">SHARE WITH BAU</span><h2 id="resource-modal-title">Add a D.C. resource</h2></div><button onClick={() => setModalOpen(false)} className="icon-button" aria-label="Close dialog"><X size={19} /></button></div>
        <form onSubmit={addResource} className="modal-form">
          <label>Category<select name="category"><option>Events & markets</option><option>Music & culture</option><option>Happy hours</option></select></label>
          <label>Name<input name="title" placeholder="Event, venue, or neighborhood pick" autoFocus required maxLength={100} /></label>
          <label>Location<input name="venue" placeholder="Venue or D.C. neighborhood" maxLength={120} /></label>
          <div className="resource-date-fields"><label>Date<input name="date" placeholder="e.g. Sat, Dec 5" maxLength={50} /></label><label>Time / hours<input name="time" placeholder="e.g. 5–7 PM" maxLength={50} /></label></div>
          <label>What should students know?<textarea name="detail" placeholder="A short tip, description, or what makes it worth a visit…" rows="3" maxLength={280} /></label>
          <div className="modal-footer"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button><button className="primary-button" type="submit"><Plus size={16} /> Publish resource</button></div>
        </form>
      </section></div>}
    </section>
  );
}

export default Resources;