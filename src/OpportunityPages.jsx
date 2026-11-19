import React, { useState } from 'react';
import {
  ArrowRight, BookOpen, CalendarDays, Check, Clock3, ExternalLink,
  GraduationCap, HeartHandshake, MapPin, Plus, Search, Users, X,
} from 'lucide-react';
import './OpportunityPages.css';

const volunteerFilters = ['All opportunities', 'Community', 'Environment', 'Education', 'Campus'];

const startingOpportunities = [
  { id: 1, category: 'Community', title: 'Weekend food pantry team', organization: 'Capital Area Food Bank', location: 'Northeast DC', schedule: 'Sat, Dec 5 · 9 AM–1 PM', commitment: 'One-time · 4 hours', description: 'Sort and pack grocery boxes for neighbors. Student groups can volunteer together; orientation is provided on arrival.', spots: '6 spots', color: 'green' },
  { id: 2, category: 'Environment', title: 'Anacostia river cleanup', organization: 'Anacostia Watershed Society', location: 'Anacostia Riverwalk Trail', schedule: 'Sat, Dec 12 · 10 AM–12 PM', commitment: 'One-time · 2 hours', description: 'Help remove litter along the river and learn about local watershed restoration. Gloves and bags are provided.', spots: '12 spots', color: 'blue' },
  { id: 3, category: 'Education', title: 'Homework club volunteer tutor', organization: 'Horton’s Kids', location: 'Southeast DC', schedule: 'Tuesdays · 4:30–6 PM', commitment: 'Weekly · semester option', description: 'Support elementary students with reading and homework in a small-group setting. Background check required.', spots: '4 openings', color: 'coral' },
  { id: 4, category: 'Campus', title: 'Welcome team for new students', organization: 'BAU Student Affairs', location: 'BAU Student Commons', schedule: 'Jan 11 · 9 AM–1 PM', commitment: 'One-time · 4 hours', description: 'Help new and international students find their classrooms, meet campus groups, and get settled for the semester.', spots: '8 spots', color: 'gold' },
  { id: 5, category: 'Community', title: 'Holiday meal delivery', organization: 'Food & Friends DC', location: 'Northwest DC', schedule: 'Sun, Dec 20 · 11 AM–2 PM', commitment: 'One-time · 3 hours', description: 'Deliver prepared meals to community members. A driver and a navigator can sign up as a pair.', spots: '5 spots', color: 'coral' },
  { id: 6, category: 'Environment', title: 'Tree care at Meridian Hill Park', organization: 'Casey Trees', location: 'Meridian Hill Park', schedule: 'Sat, Jan 9 · 9 AM–12 PM', commitment: 'One-time · 3 hours', description: 'Mulch young trees and learn basic urban tree care with a Casey Trees crew leader.', spots: '10 spots', color: 'green' },
];

const courseraFilters = ['All subjects', 'Technology', 'Business', 'Data & AI', 'Personal growth'];

const courseraCourses = [
  { id: 1, subject: 'Technology', title: 'Google IT Support Professional Certificate', provider: 'Google', level: 'Beginner', duration: 'About 6 months · 10 hrs/week', description: 'Build practical foundations in technical support, networking, operating systems, and troubleshooting.', color: 'blue' },
  { id: 2, subject: 'Data & AI', title: 'IBM Data Science Professional Certificate', provider: 'IBM', level: 'Beginner', duration: 'About 4 months · 10 hrs/week', description: 'Explore data science tools, Python, data analysis, and introductory machine learning projects.', color: 'coral' },
  { id: 3, subject: 'Business', title: 'Project Management Principles and Practices', provider: 'University of California, Irvine', level: 'Beginner', duration: 'About 5 months · flexible schedule', description: 'Learn project planning, scope, scheduling, and practical approaches for leading team projects.', color: 'green' },
  { id: 4, subject: 'Technology', title: 'Meta Front-End Developer Professional Certificate', provider: 'Meta', level: 'Beginner', duration: 'About 7 months · 6 hrs/week', description: 'Practice HTML, CSS, JavaScript, React, and the fundamentals of building modern web experiences.', color: 'gold' },
  { id: 5, subject: 'Data & AI', title: 'AI For Everyone', provider: 'DeepLearning.AI', level: 'Beginner', duration: 'About 6 hours', description: 'A non-technical introduction to AI concepts, opportunities, and responsible adoption.', color: 'blue' },
  { id: 6, subject: 'Personal growth', title: 'Learning How to Learn', provider: 'Deep Teaching Solutions', level: 'All levels', duration: 'About 15 hours', description: 'Evidence-based techniques for focused practice, memory, and learning challenging subjects.', color: 'coral' },
];

function VolunteerPage({ onNotice }) {
  const [opportunities, setOpportunities] = useState(startingOpportunities);
  const [filter, setFilter] = useState('All opportunities');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = opportunities.filter((item) =>
    (filter === 'All opportunities' || item.category === filter) &&
    `${item.title} ${item.organization} ${item.location} ${item.description}`.toLowerCase().includes(search.toLowerCase()),
  );

  const addOpportunity = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get('title')?.trim();
    if (!title) return;
    setOpportunities([{ id: Date.now(), title, organization: form.get('organization')?.trim() || 'BAU Community', location: form.get('location')?.trim() || 'Washington, D.C.', schedule: form.get('schedule')?.trim() || 'Date to be confirmed', commitment: form.get('commitment')?.trim() || 'Flexible commitment', description: form.get('description')?.trim() || 'Contact the organizer for details.', spots: 'New opportunity', category: form.get('category'), color: 'green' }, ...opportunities]);
    setFilter('All opportunities');
    setSearch('');
    setModalOpen(false);
    onNotice('Volunteer opportunity added to the list.');
  };

  return <section className="opportunities-page">
    <header className="page-heading"><div><div className="eyebrow"><HeartHandshake size={13} /> MAKE A DIFFERENCE IN DC</div><h1>Volunteering<span className="heading-period">.</span></h1><p>Campus and city-wide opportunities for BAU students.</p></div><button className="primary-button" onClick={() => setModalOpen(true)}><Plus size={17} /> Add opportunity</button></header>
    <div className="opportunity-banner"><div className="opportunity-banner-icon"><Users size={22} /></div><div><span>SHOW UP FOR YOUR COMMUNITY</span><h2>Small hours. Real impact.</h2><p>Find a way to contribute in DC and bring a friend along.</p></div><div className="opportunity-banner-stat"><b>{opportunities.length}</b><span>OPENINGS</span></div></div>
    <div className="opportunity-toolbar"><div className="filter-tabs">{volunteerFilters.map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="opportunity-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search opportunities" aria-label="Search volunteer opportunities" /></label></div>
    <div className="opportunity-grid">{filtered.map((item) => <article className={`opportunity-card opportunity-${item.color}`} key={item.id}>
      <div className="opportunity-card-top"><span className="opportunity-category">{item.category}</span><span className="opportunity-spots">{item.spots}</span></div>
      <h2>{item.title}</h2><p className="opportunity-org">{item.organization}</p>
      <div className="opportunity-meta"><span><MapPin size={14} />{item.location}</span><span><CalendarDays size={14} />{item.schedule}</span><span><Clock3 size={14} />{item.commitment}</span></div>
      <p className="opportunity-description">{item.description}</p>
      <div className="opportunity-footer"><button onClick={() => onNotice(`Your interest in ${item.title} has been noted.`)}>I’m interested <ArrowRight size={14} /></button></div>
    </article>)}{filtered.length === 0 && <div className="empty-state">No opportunities match your search yet.</div>}</div>
    {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="volunteer-modal-title"><div className="modal-heading"><div><span className="eyebrow">BAU COMMUNITY</span><h2 id="volunteer-modal-title">Add a volunteer opportunity</h2></div><button onClick={() => setModalOpen(false)} className="icon-button" aria-label="Close dialog"><X size={19} /></button></div>
      <form className="modal-form" onSubmit={addOpportunity}><label>Category<select name="category"><option>Community</option><option>Environment</option><option>Education</option><option>Campus</option></select></label><label>Opportunity name<input name="title" placeholder="e.g. Neighborhood garden volunteer day" required maxLength={100} /></label><label>Organization<input name="organization" placeholder="Organization or student group" maxLength={100} /></label><label>Location<input name="location" placeholder="Neighborhood, venue, or campus" maxLength={120} /></label><label>Date and time<input name="schedule" placeholder="e.g. Saturday · 10 AM–1 PM" maxLength={80} /></label><label>Commitment<input name="commitment" placeholder="One-time or weekly" maxLength={80} /></label><label>Description<textarea name="description" placeholder="What will volunteers do?" rows="3" maxLength={300} /></label><div className="modal-footer"><button className="secondary-button" type="button" onClick={() => setModalOpen(false)}>Cancel</button><button className="primary-button" type="submit"><Plus size={16} /> Publish opportunity</button></div></form>
    </section></div>}
  </section>;
}

function CourseraPage() {
  const [filter, setFilter] = useState('All subjects');
  const [search, setSearch] = useState('');
  const filtered = courseraCourses.filter((course) =>
    (filter === 'All subjects' || course.subject === filter) &&
    `${course.title} ${course.provider} ${course.subject} ${course.description}`.toLowerCase().includes(search.toLowerCase()),
  );

  return <section className="opportunities-page coursera-page">
    <header className="page-heading"><div><div className="eyebrow"><GraduationCap size={13} /> LEARN BEYOND THE CLASSROOM</div><h1>Coursera Courses<span className="heading-period">.</span></h1><p>Explore online learning available through BAU’s Coursera partnership.</p></div></header>
    <div className="coursera-banner"><div className="coursera-mark">C<span>.</span></div><div><span>BAU × COURSERA</span><h2>Learn on your schedule.</h2><p>Explore topics that interest you and sign in to Coursera with your BAU account.</p></div><a href="https://www.coursera.org/" target="_blank" rel="noreferrer">Visit Coursera <ExternalLink size={14} /></a></div>
    <div className="coursera-access-note"><Check size={16} /><p><b>Institutional access for BAU students.</b> Sign in to Coursera with your BAU email to check enrollment and course eligibility. Access details may vary by university account.</p></div>
    <div className="opportunity-toolbar"><div className="filter-tabs">{courseraFilters.map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="opportunity-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses or providers" aria-label="Search Coursera courses" /></label></div>
    <div className="coursera-grid">{filtered.map((course) => {
      const courseUrl = `https://www.coursera.org/search?query=${encodeURIComponent(course.title)}`;
      return <article className={`coursera-card coursera-${course.color}`} key={course.id}>
        <div className="coursera-card-top"><span className="coursera-card-icon"><BookOpen size={19} /></span><span className="coursera-subject">{course.subject}</span></div>
        <p className="coursera-provider">{course.provider}</p><h2>{course.title}</h2><p className="coursera-description">{course.description}</p>
        <div className="coursera-meta"><span><GraduationCap size={14} />{course.level}</span><span><Clock3 size={14} />{course.duration}</span></div>
        <a className="coursera-link" href={courseUrl} target="_blank" rel="noreferrer">View course on Coursera <ExternalLink size={14} /></a>
      </article>;
    })}{filtered.length === 0 && <div className="empty-state">No courses match your search yet.</div>}</div>
    <p className="coursera-disclaimer">Course examples are selected from the Coursera catalog. Access and certificate eligibility depend on BAU’s institutional agreement.</p>
  </section>;
}

export { CourseraPage, VolunteerPage };