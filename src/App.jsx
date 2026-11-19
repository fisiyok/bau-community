import React, { useState } from 'react';
import Resources from './Resources.jsx';
import { CourseraPage, VolunteerPage } from './OpportunityPages.jsx';
import './ProfileUI.css';
import {
  ArrowDownUp, ArrowRight, Bell, BookOpen, CalendarDays, Check, ChevronDown, CircleHelp,
  GraduationCap, HeartHandshake, Mail, ShieldCheck,
  Clock3, FileText, Hash, Home, ImagePlus, MapPin, MessageCircle, Plus, Search,
  Send, ShoppingBag, SlidersHorizontal, Sparkles, Users, X,
} from 'lucide-react';

const initialPosts = [
  { id: 1, category: 'Courses', author: 'Dr. Marcus Chen', role: 'Professor · CS Department', initials: 'MC', color: 'blue', time: '12 min ago', title: 'CS-301 midterm review session this Thursday', body: 'We’ll work through graph traversal, hash tables, and the practice problems from last week. Bring your questions. Room 402, 5:30 PM.', likes: 24, comments: 8, tag: 'CS-301' },
  { id: 2, category: 'Clubs', author: 'Amina Okafor', role: 'Student · Class of 2027', initials: 'AO', color: 'coral', time: '38 min ago', title: 'The BAU Film Society is back 🎬', body: 'First screening of the semester is Friday at 7 in the student lounge. We’re showing a DC-made short film and hanging out after. Everyone’s welcome!', likes: 18, comments: 5, tag: 'Film Society' },
  { id: 3, category: 'Housing', author: 'Leo Martinez', role: 'Student · Class of 2026', initials: 'LM', color: 'green', time: '1 hr ago', title: 'Looking for one more roommate in Columbia Heights', body: 'Sunny 3BR apartment, 8-minute walk to the Metro. Move-in around Jan 1. Rent is $930 + utilities. Message me if you want to come by this weekend!', likes: 12, comments: 11, tag: 'Housing' },
  { id: 4, category: 'Courses', author: 'Priya Shah', role: 'Student · Class of 2028', initials: 'PS', color: 'gold', time: '2 hrs ago', title: 'Anyone in SE-310 forming a project group?', body: 'I’m interested in working on a small campus events app for the semester project. Hoping to find 2–3 people who are into React or product design!', likes: 9, comments: 14, tag: 'SE-310' },
];

const courses = [
  { code: 'CS-301', name: 'Data Structures', professor: 'Dr. Marcus Chen', room: 'Engineering 402', time: 'Mon, Wed · 10:00 AM', color: 'course-blue', initials: 'MC', syllabus: '/syllabi/CS-301-syllabus.md', announcements: ['Midterm review session · Thu, 5:30 PM', 'Week 8 notes: Graph algorithms are up'] },
  { code: 'SE-310', name: 'Software Engineering', professor: 'Prof. Nina Patel', room: 'Tech Center 218', time: 'Tue, Thu · 1:30 PM', color: 'course-coral', initials: 'NP', syllabus: '/syllabi/SE-310-syllabus.md', announcements: ['Project teams due by Friday', 'Sprint planning workshop · Oct 24'] },
  { code: 'BUS-205', name: 'Business Communication', professor: 'Dr. Elaine Brooks', room: 'Founders Hall 106', time: 'Mon, Wed · 2:00 PM', color: 'course-green', initials: 'EB', syllabus: '/syllabi/BUS-205-syllabus.md', announcements: ['Case study presentations start next week'] },
];

const initialNotes = [
  { title: 'CS-301 · Trees & graph traversal', author: 'Priya Shah', date: 'Oct 18', kind: 'Study guide', color: 'note-blue' },
  { title: 'SE-310 · Sprint planning template', author: 'Jordan Lee', date: 'Oct 16', kind: 'Template', color: 'note-orange' },
  { title: 'BUS-205 · Week 6 lecture notes', author: 'Marcus Reed', date: 'Oct 14', kind: 'Lecture notes', color: 'note-green' },
];

const initialMessages = {
  'general-bau': [
    { name: 'Amina Okafor', initials: 'AO', color: 'coral', time: '10:42 AM', text: 'Good morning, everyone! Anyone know if the coffee cart is open today?' },
    { name: 'Jordan Lee', initials: 'JL', color: 'blue', time: '10:44 AM', text: 'Yep, just walked by. They’re set up in the lobby ☕' },
    { name: 'You', initials: 'JD', color: 'green', time: '10:47 AM', text: 'A lifesaver. Midterm week fuel secured.' },
    { name: 'Sofia Reyes', initials: 'SR', color: 'gold', time: '11:02 AM', text: 'Reminder: the international student mixer is tonight at 6 in the common room!' },
  ],
  'dc-housing': [
    { name: 'Marcus Reed', initials: 'MR', color: 'blue', time: 'Yesterday', text: 'Sharing a great apartment listing near U Street, 2BR available for January.' },
  ],
};

const initialListings = [
  { id: 1, kind: 'item', category: 'Textbooks', title: 'Introduction to Algorithms, 4th ed.', details: 'CLRS · barely used, no highlighting', price: '$48', seller: 'Jordan Lee', initials: 'JL', color: 'blue', badge: 'Textbooks', art: '📚' },
  { id: 2, kind: 'item', category: 'Electronics', title: 'Dell 24” monitor', details: '1080p IPS · includes HDMI cable', price: '$85', seller: 'Sofia Reyes', initials: 'SR', color: 'coral', badge: 'Electronics', art: '🖥️' },
  { id: 3, kind: 'item', category: 'Furniture', title: 'IKEA desk + task chair', details: 'Moving sale · pick up in Dupont', price: '$60', seller: 'Marcus Reed', initials: 'MR', color: 'green', badge: 'Furniture', art: '🪑' },
  { id: 4, kind: 'housing', category: 'Rooms', title: 'Room in 3BR · Columbia Heights', details: 'Jan 1 · 8 min to Metro · utilities split', price: '$930/mo', seller: 'Leo Martinez', initials: 'LM', color: 'gold', badge: 'Room available', art: '🏠' },
  { id: 5, kind: 'housing', category: 'Apartments', title: 'Sunny 2BR · Adams Morgan', details: 'Available Dec 15 · pets welcome', price: '$1,180/mo', seller: 'Amina Okafor', initials: 'AO', color: 'coral', badge: 'Apartment', art: '🏙️' },
  { id: 6, kind: 'housing', category: 'Roommates', title: 'Roommate wanted · Shaw', details: 'Shared 2BR · furnished · January move-in', price: '$1,050/mo', seller: 'Priya Shah', initials: 'PS', color: 'blue', badge: 'Roommate wanted', art: '🗝️' },
];

const navItems = [
  { id: 'feed', label: 'Campus Feed', icon: Home },
  { id: 'chat', label: 'Campus Chat', icon: MessageCircle, count: '2' },
  { id: 'courses', label: 'Courses & Notes', icon: BookOpen },
  { id: 'volunteering', label: 'Volunteering', icon: HeartHandshake },
  { id: 'coursera', label: 'Coursera Courses', icon: GraduationCap },
  { id: 'resources', label: 'DC Resources', icon: CalendarDays },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
];

const channelLabels = { 'general-bau': 'general-bau', 'dc-housing': 'dc-housing' };

function Avatar({ initials, color = 'blue', small = false }) {
  return <span className={`avatar avatar-${color}${small ? ' avatar-small' : ''}`}>{initials}</span>;
}

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [role, setRole] = useState('Student');
  const [feedFilter, setFeedFilter] = useState('All');
  const [posts, setPosts] = useState(initialPosts);
  const [joined, setJoined] = useState(['CS-301']);
  const [notes, setNotes] = useState(initialNotes);
  const [messages, setMessages] = useState(initialMessages);
  const [channel, setChannel] = useState('general-bau');
  const [messageText, setMessageText] = useState('');
  const [listings, setListings] = useState(initialListings);
  const [listingFilter, setListingFilter] = useState('All listings');
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState('');
  const [pendingRole, setPendingRole] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'CS-301 midterm review', detail: 'Dr. Marcus Chen shared a new course announcement.', time: '12 min ago', read: false, color: 'blue' },
    { id: 2, title: 'New comment on your post', detail: 'Priya Shah replied to your study group post.', time: '1 hr ago', read: false, color: 'coral' },
    { id: 3, title: 'Welcome to BAU Community', detail: 'Your campus community is ready to explore.', time: 'Yesterday', read: true, color: 'green' },
  ]);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const requestRoleChange = (nextRole) => {
    setProfileOpen('');
    setPendingRole(nextRole === role ? '' : nextRole);
  };

  const unreadNotifications = notifications.filter((item) => !item.read).length;

  const submitPost = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get('title')?.trim();
    if (!title) return;
    setPosts([{ id: Date.now(), category: form.get('category'), author: role === 'Professor' ? 'Dr. You' : 'Jamie Davis', role: `${role} · Bay Atlantic University`, initials: role === 'Professor' ? 'DY' : 'JD', color: 'blue', time: 'Just now', title, body: form.get('body')?.trim() || 'Just shared with the BAU community.', likes: 0, comments: 0, tag: form.get('category') }, ...posts]);
    setModal(null);
    showNotice('Your post is live on the campus feed.');
  };

  const submitNote = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get('title')?.trim();
    if (!title) return;
    setNotes([{ title, author: role === 'Professor' ? 'Dr. You' : 'Jamie Davis', date: 'Just now', kind: form.get('course'), color: 'note-blue' }, ...notes]);
    setModal(null);
    showNotice('Study note added to the shared library.');
  };

  const submitListing = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get('title')?.trim();
    if (!title) return;
    const category = form.get('category');
    const housing = category === 'Housing';
    setListings([{ id: Date.now(), kind: housing ? 'housing' : 'item', category: housing ? 'Rooms' : category, title, details: form.get('details')?.trim() || 'Posted by a BAU community member', price: form.get('price')?.trim() || 'Contact for price', seller: role === 'Professor' ? 'Dr. You' : 'Jamie Davis', initials: role === 'Professor' ? 'DY' : 'JD', color: 'blue', badge: category, art: housing ? '🏠' : '📦' }, ...listings]);
    setModal(null);
    showNotice('Your listing is now visible to the community.');
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (!messageText.trim()) return;
    setMessages({ ...messages, [channel]: [...(messages[channel] || []), { name: 'You', initials: role === 'Professor' ? 'DY' : 'JD', color: 'blue', time: 'Now', text: messageText.trim() }] });
    setMessageText('');
  };

  const visiblePosts = posts.filter((post) => (feedFilter === 'All' || post.category === feedFilter) && `${post.title} ${post.body} ${post.author}`.toLowerCase().includes(search.toLowerCase()));
  const visibleListings = listings.filter((listing) => (listingFilter === 'All listings' || (listingFilter === 'For sale' ? listing.kind === 'item' : listing.kind === 'housing')) && `${listing.title} ${listing.details} ${listing.category}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setActiveTab('feed')} aria-label="BAU Community home">
          <span className="brand-mark">b<span>.</span></span>
          <span className="brand-copy">BAU <b>community</b><small>WASHINGTON, D.C.</small></span>
        </button>
        <div className="campus-switch"><span className="campus-dot" /><span>Bay Atlantic University<small>Washington, D.C.</small></span><ChevronDown size={15} /></div>
        <p className="nav-label">CAMPUS</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon, count }) => <button key={id} className={`nav-item${activeTab === id ? ' active' : ''}`} onClick={() => { setActiveTab(id); setSearch(''); }}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{count && <span className="nav-count">{count}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="semester-card"><span className="semester-kicker"><Sparkles size={13} /> YOUR CAMPUS, CONNECTED</span><strong>Fall semester<br />is in full swing.</strong><span>Find your people. Share what you know.</span><button onClick={() => setActiveTab('courses')}>Explore courses <ArrowRight size={14} /></button></div>
          <button className="help-link" onClick={() => showNotice('Need a hand? Email community@bau.edu')}><CircleHelp size={17} /> Help & support</button>
          <div className="profile-anchor sidebar-profile-anchor"><button className="profile-row" aria-expanded={profileOpen === 'sidebar'} onClick={() => setProfileOpen(profileOpen === 'sidebar' ? '' : 'sidebar')}><Avatar initials={role === 'Student' ? 'JD' : 'DY'} color="coral" /><span><b>Jamie Davis</b><small>{role} account</small></span><span className="profile-dots">···</span></button>{profileOpen === 'sidebar' && <ProfilePanel role={role} onRequestRole={requestRoleChange} />}</div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="breadcrumb"><span>Bay Atlantic University</span><span className="crumb-slash">/</span><b>{navItems.find((item) => item.id === activeTab)?.label}</b></div>
          <label className="search-box"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the community" aria-label="Search the community" /><kbd>⌘ K</kbd></label>
          <div className="popover-anchor"><button className="icon-button notification-button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(''); }}><Bell size={18} />{unreadNotifications > 0 && <i />}</button>{notificationsOpen && <NotificationsPanel items={notifications} onMarkAll={() => setNotifications(notifications.map((item) => ({ ...item, read: true })))} onClose={() => setNotificationsOpen(false)} />}</div>
          <div className="role-switch" aria-label="Demo role switch"><button className={role === 'Student' ? 'selected' : ''} onClick={() => requestRoleChange('Student')}>Student</button><button className={role === 'Professor' ? 'selected' : ''} onClick={() => requestRoleChange('Professor')}>Professor</button></div>
          <div className="profile-anchor top-profile-anchor"><button className="top-avatar" onClick={() => { setProfileOpen(profileOpen === 'top' ? '' : 'top'); setNotificationsOpen(false); }} aria-label="Open account profile" aria-expanded={profileOpen === 'top'}>{role === 'Student' ? 'JD' : 'DY'}</button>{profileOpen === 'top' && <ProfilePanel role={role} onRequestRole={requestRoleChange} />}</div>
        </header>

        <main className="page-content">
          {activeTab === 'feed' && <>
            <section className="page-heading"><div><div className="eyebrow"><span className="live-dot" /> YOUR CAMPUS, RIGHT NOW</div><h1>Campus Feed<span className="heading-period">.</span></h1><p>What’s happening around Bay Atlantic today.</p></div><button className="primary-button" onClick={() => setModal('post')}><Plus size={17} /> New post</button></section>
            <div className="feed-layout"><section className="feed-main"><div className="feed-toolbar"><div className="filter-tabs">{['All', 'Courses', 'Clubs', 'Housing'].map((filter) => <button key={filter} className={feedFilter === filter ? 'selected' : ''} onClick={() => setFeedFilter(filter)}>{filter}{filter === 'All' && <span className="filter-total">{posts.length}</span>}</button>)}</div><button className="sort-button" onClick={() => showNotice('Showing newest posts first')}><ArrowDownUp size={15} /> Newest</button></div>
              <div className="post-list">{visiblePosts.map((post) => <article className="post-card" key={post.id}><div className="post-top"><Avatar initials={post.initials} color={post.color} /><div className="post-byline"><b>{post.author}</b><span>{post.role} <i>·</i> {post.time}</span></div><button className="more-button" aria-label="More post options" onClick={() => showNotice('Post options are coming soon.')}>···</button></div><div className="post-content"><span className={`category-pill category-${post.category.toLowerCase()}`}>{post.tag}</span><h2>{post.title}</h2><p>{post.body}</p></div><div className="post-footer"><button onClick={() => setPosts(posts.map((item) => item.id === post.id ? { ...item, likes: item.likes + 1 } : item))}><span className="heart-icon">♡</span>{post.likes} likes</button><button onClick={() => showNotice('Comments are open for this post.')}><MessageCircle size={15} /> {post.comments} comments</button><button className="share-action" onClick={() => showNotice('Post link copied to clipboard.')}><ArrowRight size={15} /></button></div></article>)}{visiblePosts.length === 0 && <div className="empty-state">No posts match this view yet.</div>}</div>
            </section><aside className="feed-rail"><div className="rail-heading"><h3>On campus</h3><button onClick={() => showNotice('You’re viewing the Washington, D.C. campus.')}>See all</button></div><div className="event-card"><div className="event-date"><b>24</b><span>OCT</span></div><div><span className="event-type">STUDENT LIFE</span><h4>International Mixer</h4><p><Clock3 size={13} /> Today, 6:00 PM</p><p><MapPin size={13} /> Student Commons</p></div><button className="event-arrow" aria-label="View event" onClick={() => showNotice('International Mixer · Student Commons at 6 PM')}><ArrowRight size={16} /></button></div><div className="rail-section"><div className="rail-heading"><h3>People to know</h3><button onClick={() => showNotice('You’re connected with the BAU community.')}>View all</button></div><div className="person-row"><Avatar initials="NP" color="coral" small /><span><b>Prof. Nina Patel</b><small>Software Engineering</small></span><button onClick={() => showNotice('Connection request sent to Prof. Nina Patel.')} aria-label="Connect with Nina Patel"><Plus size={16} /></button></div><div className="person-row"><Avatar initials="SR" color="gold" small /><span><b>Sofia Reyes</b><small>Design Club · Class of ’27</small></span><button onClick={() => showNotice('Connection request sent to Sofia Reyes.')} aria-label="Connect with Sofia Reyes"><Plus size={16} /></button></div><div className="person-row"><Avatar initials="MC" color="blue" small /><span><b>Dr. Marcus Chen</b><small>Computer Science</small></span><button onClick={() => showNotice('Connection request sent to Dr. Marcus Chen.')} aria-label="Connect with Marcus Chen"><Plus size={16} /></button></div></div><div className="campus-note"><span>✳</span><p><b>A little campus note</b><br />Make room for good ideas, and the people behind them.</p></div></aside></div>
          </>}

          {activeTab === 'courses' && <>
            <section className="page-heading"><div><div className="eyebrow"><BookOpen size={13} /> LEARN TOGETHER</div><h1>Courses & Notes<span className="heading-period">.</span></h1><p>Your classes, professor updates, and shared study materials.</p></div><button className="primary-button" onClick={() => setModal('note')}><Plus size={17} /> Add a note</button></section>
            <div className="section-title-row"><div><h2>Your courses</h2><p>Fall 2026 · 3 courses</p></div><button className="text-action" onClick={() => showNotice('Showing all courses for Fall 2026.')}>Browse courses <ArrowRight size={15} /></button></div>
            <div className="course-grid">{courses.map((course) => <article className={`course-card ${course.color}`} key={course.code}><div className="course-card-top"><span>{course.code}</span><button className={`join-button${joined.includes(course.code) ? ' joined' : ''}`} onClick={() => setJoined(joined.includes(course.code) ? joined.filter((code) => code !== course.code) : [...joined, course.code])}>{joined.includes(course.code) ? <><Check size={14} /> Joined</> : <><Plus size={14} /> Join</>}</button></div><h3>{course.name}</h3><div className="course-prof"><Avatar initials={course.initials} color={course.color === 'course-blue' ? 'blue' : course.color === 'course-coral' ? 'coral' : 'green'} small /><span>{course.professor}</span></div><div className="course-meta"><span><Clock3 size={14} /> {course.time}</span><span><MapPin size={14} /> {course.room}</span></div><a className="syllabus-link" href={course.syllabus} download><FileText size={14} /><span>Course syllabus</span><b>Download document <ArrowRight size={13} /></b></a><div className="announcement-list"><div className="announcement-title">PROFESSOR ANNOUNCEMENTS <span>{course.announcements.length}</span></div>{course.announcements.map((announcement) => <button key={announcement} onClick={() => showNotice(announcement)}><span className="announcement-dot" />{announcement}<ArrowRight size={13} /></button>)}</div></article>)}</div>
            <section className="notes-section"><div className="section-title-row"><div><h2>Shared study notes</h2><p>Good notes are better when they’re shared.</p></div><button className="secondary-button" onClick={() => setModal('note')}><Plus size={16} /> Share a note</button></div><div className="notes-list">{notes.map((note, index) => <button className="note-row" key={`${note.title}-${index}`} onClick={() => showNotice(`Opening ${note.title}`)}><span className={`note-icon ${note.color}`}><BookOpen size={19} /></span><span className="note-main"><b>{note.title}</b><small>{note.author} <i>·</i> {note.date}</small></span><span className="note-kind">{note.kind}</span><ArrowRight size={16} className="note-arrow" /></button>)}</div></section>
          </>}

          {activeTab === 'resources' && <Resources onNotice={showNotice} />}
          {activeTab === 'volunteering' && <VolunteerPage onNotice={showNotice} />}
          {activeTab === 'coursera' && <CourseraPage />}
          {activeTab === 'chat' && <>
            <section className="page-heading"><div><div className="eyebrow"><span className="chat-live-dot" /> THE CAMPUS CONVERSATION</div><h1>Campus Chat<span className="heading-period">.</span></h1><p>Ask a question, share a tip, or just say hey.</p></div><button className="secondary-button" onClick={() => showNotice('New channels are created by campus admins.')}><Plus size={16} /> New channel</button></section>
            <div className="chat-panel"><aside className="channel-list"><div className="channel-list-heading"><span>CHANNELS</span><button aria-label="Add channel" onClick={() => showNotice('New channels are created by campus admins.')}><Plus size={16} /></button></div>{Object.keys(channelLabels).map((id) => <button key={id} onClick={() => setChannel(id)} className={`channel-button${channel === id ? ' selected' : ''}`}><Hash size={16} /><span>{channelLabels[id]}</span>{id === 'general-bau' && <i className="channel-unread" />}</button>)}<div className="channel-tip"><Users size={16} /><p><b>Good conversations start here.</b><br />Keep it kind, keep it campus.</p></div></aside><section className="chat-conversation"><div className="chat-channel-header"><div><h2><Hash size={18} /> {channelLabels[channel]}</h2><p>Bay Atlantic University community</p></div><button className="icon-button" aria-label="Channel details" onClick={() => showNotice('A shared space for the BAU community.')}><Users size={18} /></button></div><div className="chat-messages"><div className="day-divider"><span>TODAY</span></div>{(messages[channel] || []).map((message, index) => <div className="message-row" key={`${message.name}-${index}`}><Avatar initials={message.initials} color={message.color} small /><div className="message-body"><div className="message-meta"><b>{message.name}</b><span>{message.time}</span></div><p>{message.text}</p></div></div>)}</div><form className="message-composer" onSubmit={sendMessage}><button type="button" className="composer-plus" aria-label="Attach an item" onClick={() => showNotice('File attachments are not enabled in the demo.')}><Plus size={19} /></button><input value={messageText} onChange={(event) => setMessageText(event.target.value)} placeholder={`Message #${channelLabels[channel]}`} aria-label="Write a message" /><button className="send-button" type="submit" disabled={!messageText.trim()} aria-label="Send message"><Send size={17} /></button></form></section></div>
          </>}

          {activeTab === 'marketplace' && <>
            <section className="page-heading"><div><div className="eyebrow"><ShoppingBag size={13} /> GOOD FINDS, CLOSE BY</div><h1>Marketplace<span className="heading-period">.</span></h1><p>Buy, sell, and find your next place in D.C.</p></div><button className="primary-button" onClick={() => setModal('listing')}><Plus size={17} /> Post listing</button></section>
            <div className="market-banner"><div className="market-banner-mark">M<span>+</span></div><div><b>Pass it on. Find your next.</b><p>Student-to-student finds, a few Metro stops away.</p></div><span className="market-banner-caption">MADE FOR THE BAU COMMUNITY</span></div>
            <div className="market-toolbar"><div className="filter-tabs">{['All listings', 'For sale', 'Housing'].map((filter) => <button key={filter} className={listingFilter === filter ? 'selected' : ''} onClick={() => setListingFilter(filter)}>{filter}</button>)}</div><button className="sort-button" onClick={() => showNotice('Showing newest listings first')}><SlidersHorizontal size={15} /> Filters</button></div>
            <div className="listing-grid">{visibleListings.map((listing) => <article className="listing-card" key={listing.id}><div className={`listing-art listing-art-${listing.color}`}><span>{listing.art}</span><span className="listing-badge">{listing.badge}</span><button aria-label="Save listing" onClick={() => showNotice('Listing saved to your favorites.')} className="save-listing">♡</button></div><div className="listing-info"><div className="listing-price-row"><h3>{listing.title}</h3><b>{listing.price}</b></div><p>{listing.details}</p><div className="listing-seller"><span><Avatar initials={listing.initials} color={listing.color} small /> {listing.seller}</span><button onClick={() => { setChannel('dc-housing'); setActiveTab('chat'); showNotice(`Opening a message to ${listing.seller}.`); }} aria-label={`Message ${listing.seller}`}><MessageCircle size={15} /> Message</button></div></div></article>)}{visibleListings.length === 0 && <div className="empty-state">No listings match your search.</div>}</div>
          </>}
          <footer className="page-footer"><span>BAU COMMUNITY <i>·</i> WASHINGTON, D.C.</span><span>Made for campus life <span className="footer-star">✳</span></span></footer>
        </main>
      </div>
      {modal && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><span className="eyebrow">BAU COMMUNITY</span><h2 id="modal-title">{modal === 'post' ? 'Share with campus' : modal === 'note' ? 'Add to the notes' : 'Post a listing'}</h2></div><button onClick={() => setModal(null)} className="icon-button" aria-label="Close dialog"><X size={19} /></button></div>
        {modal === 'post' && <form onSubmit={submitPost} className="modal-form"><label>Post category<select name="category"><option>Courses</option><option>Clubs</option><option>Housing</option></select></label><label>Headline<input name="title" placeholder="What’s happening?" autoFocus required maxLength={100} /></label><label>Details<textarea name="body" placeholder="Add a little more context…" rows="4" maxLength={500} /></label><div className="modal-footer"><button type="button" className="secondary-button" onClick={() => setModal(null)}>Cancel</button><button className="primary-button" type="submit"><ImagePlus size={16} /> Publish post</button></div></form>}
        {modal === 'note' && <form onSubmit={submitNote} className="modal-form"><label>Course<select name="course"><option>CS-301 · Data Structures</option><option>SE-310 · Software Engineering</option><option>BUS-205 · Business Communication</option></select></label><label>Note title<input name="title" placeholder="e.g. Week 5 lecture summary" autoFocus required maxLength={100} /></label><label>Short description<textarea name="description" placeholder="What will classmates find inside?" rows="3" maxLength={300} /></label><div className="modal-footer"><button type="button" className="secondary-button" onClick={() => setModal(null)}>Cancel</button><button className="primary-button" type="submit"><Plus size={16} /> Add to library</button></div></form>}
        {modal === 'listing' && <form onSubmit={submitListing} className="modal-form"><label>Listing type<select name="category"><option>Textbooks</option><option>Electronics</option><option>Furniture</option><option>Housing</option></select></label><label>Title<input name="title" placeholder="What are you listing?" autoFocus required maxLength={100} /></label><label>Details<textarea name="details" placeholder="Condition, location, move-in date…" rows="3" maxLength={300} /></label><label>Price<input name="price" placeholder="e.g. $45 or $950/mo" maxLength={30} /></label><div className="modal-footer"><button type="button" className="secondary-button" onClick={() => setModal(null)}>Cancel</button><button className="primary-button" type="submit"><Plus size={16} /> Publish listing</button></div></form>}
      </section></div>}
      {pendingRole && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingRole(''); }}><section className="modal role-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="role-confirm-title"><div className="modal-heading"><div><span className="eyebrow">DEMO VIEW</span><h2 id="role-confirm-title">Switch to {pendingRole} view?</h2></div><button onClick={() => setPendingRole('')} className="icon-button" aria-label="Close confirmation"><X size={19} /></button></div><p className="role-confirm-copy">The demo will show the {pendingRole.toLowerCase()} experience. Your account profile stays the same.</p><div className="modal-footer"><button className="secondary-button" onClick={() => setPendingRole('')}>Stay as {role}</button><button className="primary-button" onClick={() => { setRole(pendingRole); setPendingRole(''); }}>Switch view</button></div></section></div>}
      {notice && <div className="toast" role="status"><Check size={16} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={14} /></button></div>}
      <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setActiveTab(id)} className={activeTab === id ? 'active' : ''}><Icon size={19} /><span>{label.replace('Campus ', '')}</span></button>)}</nav>
    </div>
  );
}

function NotificationsPanel({ items, onMarkAll, onClose }) {
  const [readIds, setReadIds] = useState([]);
  const unreadCount = items.filter((item) => !item.read && !readIds.includes(item.id)).length;

  return <section className="top-popover notifications-popover" aria-label="Notifications panel">
    <header className="popover-heading"><div><b>Notifications</b><span>{unreadCount ? `${unreadCount} unread` : 'You’re all caught up'}</span></div><button onClick={onClose} aria-label="Close notifications"><X size={16} /></button></header>
    <div className="notification-list">{items.map((item) => {
      const unread = !item.read && !readIds.includes(item.id);
      return <button key={item.id} className={`notification-item${unread ? ' notification-unread' : ''}`} onClick={() => setReadIds([...readIds, item.id])}><span className={`notification-icon notification-icon-${item.color}`}><Bell size={15} /></span><span className="notification-copy"><b>{item.title}</b><span>{item.detail}</span><small>{item.time}</small></span>{unread && <i />}</button>;
    })}</div>
    <button className="mark-read-button" onClick={onMarkAll}>Mark all as read</button>
  </section>;
}

function ProfilePanel({ role, onRequestRole }) {
  return <section className="top-popover profile-popover" aria-label="Account profile">
    <div className="profile-popover-heading"><Avatar initials={role === 'Student' ? 'JD' : 'DY'} color="coral" /><div><b>Jamie Davis</b><span>BAU Community account</span></div></div>
    <div className="account-details"><div><Mail size={14} /><span><small>University email</small><b>jamie.davis@bau.edu</b></span></div><div><GraduationCap size={14} /><span><small>University</small><b>Bay Atlantic University</b></span></div><div><BookOpen size={14} /><span><small>Program</small><b>{role === 'Student' ? 'Computer Science · Class of 2027' : 'Computer Science Faculty'}</b></span></div><div><ShieldCheck size={14} /><span><small>Account type</small><b>{role} demo account</b></span></div></div>
    <div className="profile-role-actions"><span>DEMO VIEW</span><button className={role === 'Student' ? 'current-role' : ''} onClick={() => onRequestRole('Student')}>Student view</button><button className={role === 'Professor' ? 'current-role' : ''} onClick={() => onRequestRole('Professor')}>Professor view</button></div>
  </section>;
}

export default App;