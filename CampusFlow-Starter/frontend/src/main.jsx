import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const tasks = [
    { title: 'Complete BDL Assignment', priority: 'High', due: 'Today' },
    { title: 'Hackathon Preparation', priority: 'High', due: 'Tomorrow' },
    { title: 'C Programming Practice', priority: 'Medium', due: 'Monday' }
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">Campus<span>Flow</span></div>
        <nav>
          <a className="active">Dashboard</a>
          <a>My Tasks</a>
          <a>Projects</a>
          <a>Calendar</a>
          <a>Team</a>
          <a>Notifications</a>
        </nav>
      </aside>

      <main className="main">
        <header>
          <div>
            <p className="eyebrow">STUDENT WORKSPACE</p>
            <h1>Good evening, Meeran 👋</h1>
            <p className="muted">Everything you need for your college work in one place.</p>
          </div>
          <button className="primary">+ New Task</button>
        </header>

        <section className="stats">
          <div className="stat"><span>Tasks</span><strong>5</strong><small>2 due soon</small></div>
          <div className="stat"><span>Projects</span><strong>3</strong><small>1 active</small></div>
          <div className="stat"><span>Events</span><strong>4</strong><small>This week</small></div>
          <div className="stat"><span>Progress</span><strong>72%</strong><small>Weekly productivity</small></div>
        </section>

        <section className="grid">
          <div className="panel">
            <div className="panel-head"><h2>Priority Tasks</h2><button>View all</button></div>
            {tasks.map((task) => (
              <div className="task" key={task.title}>
                <div className="check"></div>
                <div className="task-info">
                  <strong>{task.title}</strong>
                  <span>Due: {task.due}</span>
                </div>
                <b className={task.priority.toLowerCase()}>{task.priority}</b>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-head"><h2>Upcoming</h2><button>Calendar</button></div>
            <div className="event"><b>28</b><div><strong>BDL Assignment</strong><span>Submission deadline</span></div></div>
            <div className="event"><b>29</b><div><strong>Team Meeting</strong><span>CampusFlow project</span></div></div>
            <div className="event"><b>10</b><div><strong>Hackathon</strong><span>Odoo × NMIT Bangalore</span></div></div>
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
