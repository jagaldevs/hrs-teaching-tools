import { useRef, useState } from 'react';
import { Check, Download, Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { ToolShell } from '../ToolShell';
import {
  addRoster,
  deleteRoster,
  exportRosters,
  importRosters,
  setActiveRoster,
  studentsToText,
  today,
  updateRoster,
  useRosterState,
  type Roster,
} from './rosters';
import common from '../common.module.css';
import styles from './MyClasses.module.css';

type Editing = { id: string | 'new'; name: string; text: string } | null;

export function MyClasses() {
  const { rosters, activeId } = useRosterState();
  const [editing, setEditing] = useState<Editing>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function startNew() {
    setEditing({ id: 'new', name: '', text: '' });
    setMessage(null);
  }

  function startEdit(r: Roster) {
    setEditing({ id: r.id, name: r.name, text: studentsToText(r.students) });
    setMessage(null);
  }

  function save() {
    if (!editing) return;
    if (editing.id === 'new') addRoster(editing.name, editing.text);
    else updateRoster(editing.id, { name: editing.name, text: editing.text });
    setEditing(null);
  }

  function remove(r: Roster) {
    if (window.confirm(`Delete "${r.name}" and its ${r.students.length} names? This can't be undone.`)) {
      deleteRoster(r.id);
      if (editing?.id === r.id) setEditing(null);
    }
  }

  function download() {
    const blob = new Blob([exportRosters()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hrs-classes-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function upload(file: File) {
    try {
      const n = importRosters(await file.text());
      setMessage({ kind: 'ok', text: `Imported ${n} ${n === 1 ? 'class' : 'classes'}.` });
    } catch (e) {
      setMessage({ kind: 'error', text: e instanceof Error ? e.message : 'Couldn’t read that file.' });
    }
  }

  const editor = editing && (
    <div className={styles.editor}>
      <label className={styles.field}>
        <span className={common.labelText}>Class name</span>
        <input
          className={styles.input}
          value={editing.name}
          onChange={(e) => setEditing({ ...editing, name: e.target.value })}
          placeholder="e.g. 8B Humanities"
          autoFocus
        />
      </label>
      <label className={styles.field}>
        <span className={common.labelText}>
          Students · {editing.text.split(/[\n,]+/).filter((s) => s.trim()).length}
        </span>
        <textarea
          className={styles.textarea}
          value={editing.text}
          onChange={(e) => setEditing({ ...editing, text: e.target.value })}
          placeholder={'One name per line, or comma-separated.\nPaste straight from a class list.'}
          rows={10}
        />
      </label>
      <div className={styles.editorActions}>
        <button type="button" className={common.btn} onClick={() => setEditing(null)}>
          Cancel
        </button>
        <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={save}>
          <Check size={14} /> Save class
        </button>
      </div>
    </div>
  );

  return (
    <ToolShell
      eyebrow="Classroom"
      title="My classes"
      description="Class lists shared by Name Picker, Group Maker, Tournaments and Custom Spinner. Saved on this device only."
      actions={
        <>
          <button type="button" className={common.btn} onClick={download} disabled={rosters.length === 0}>
            <Download size={14} /> Back up
          </button>
          <button type="button" className={common.btn} onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> Restore
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = '';
            }}
          />
        </>
      }
    >
      <div className={styles.page}>
        {message && (
          <p className={styles.message} data-kind={message.kind} role="status">
            {message.text}
          </p>
        )}

        {rosters.length === 0 && editing?.id !== 'new' && (
          <div className={styles.emptyCard}>
            <p className={styles.emptyTitle}>No classes yet</p>
            <p className={styles.emptyText}>
              Add a class once and every tool can use it. Names stay on this device and are never sent anywhere.
            </p>
          </div>
        )}

        <ul className={styles.list}>
          {rosters.map((r) => (
            <li key={r.id} className={styles.card} data-active={r.id === activeId}>
              {editing?.id === r.id ? (
                editor
              ) : (
                <>
                  <div className={styles.cardMain}>
                    <span className={styles.cardName}>{r.name}</span>
                    <span className={styles.cardMeta}>
                      {r.students.length} {r.students.length === 1 ? 'student' : 'students'}
                      {r.id === activeId && ' · in use'}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    {r.id !== activeId && (
                      <button type="button" className={common.btn} onClick={() => setActiveRoster(r.id)}>
                        Use this class
                      </button>
                    )}
                    <button type="button" className={common.btn} onClick={() => startEdit(r)} aria-label={`Edit ${r.name}`}>
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      type="button"
                      className={`${common.btn} ${common.btnDanger}`}
                      onClick={() => remove(r)}
                      aria-label={`Delete ${r.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
          {editing?.id === 'new' && <li className={styles.card}>{editor}</li>}
        </ul>

        {editing?.id !== 'new' && (
          <button type="button" className={`${common.btn} ${common.btnPrimary}`} onClick={startNew}>
            <Plus size={14} /> Add a class
          </button>
        )}

        <p className={styles.footnote}>
          Classes live in this browser only. Use <strong>Back up</strong> to save a file you can{' '}
          <strong>Restore</strong> on another computer.
        </p>
      </div>
    </ToolShell>
  );
}
