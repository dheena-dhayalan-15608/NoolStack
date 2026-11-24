/* Python in the browser, with Brython 3.15.0 from public/vendor/.
   It is loaded only when a learner first runs Python. */
const PY_HARNESS = `
import sys
from browser import window
class _W:
    def __init__(self,k): self.k=k
    def write(self,s): window.eaasOut(self.k,s)
    def flush(self): pass
_NS={'__name__':'__main__'}
_RNS={'__name__':'__main__'}
def _line(e):
    tb=e.__traceback__; ln=None
    while tb is not None:
        if tb.tb_frame.f_code.co_filename=='<string>': ln=tb.tb_lineno
        tb=tb.tb_next
    return ln
def run(src,inputs):
    global _NS
    import builtins
    q=list(inputs)
    def _inp(prompt=''):
        v=q.pop(0) if q else ''
        window.eaasOut('echo',str(prompt)+v+'\\n')
        return v
    old=(sys.stdout,sys.stderr,builtins.input)
    sys.stdout=_W('out');sys.stderr=_W('err');builtins.input=_inp
    _NS={'__name__':'__main__'}
    try:
        exec(src,_NS)
    except SyntaxError as e:
        window.eaasOut('err',(f"Line {e.lineno}: " if e.lineno else "")+f"SyntaxError: {e.msg}\\n")
    except BaseException as e:
        ln=_line(e)
        window.eaasOut('err',(f"Line {ln}: " if ln else "")+f"{type(e).__name__}: {e}\\n")
    finally:
        sys.stdout,sys.stderr,builtins.input=old
def repl(line):
    old=(sys.stdout,sys.stderr)
    sys.stdout=_W('out');sys.stderr=_W('err')
    try:
        try:
            v=eval(line,_RNS); isexpr=True
        except SyntaxError:
            isexpr=False
        if isexpr:
            if v is not None: sys.stdout.write(repr(v)+'\\n')
        else:
            exec(line,_RNS)
    except SyntaxError as e:
        window.eaasOut('err',f"SyntaxError: {e.msg}\\n")
    except BaseException as e:
        window.eaasOut('err',f"{type(e).__name__}: {e}\\n")
    finally:
        sys.stdout,sys.stderr=old
def repl_reset():
    global _RNS
    _RNS={'__name__':'__main__'}
window.eaasExec=run
window.eaasRepl=repl
window.eaasReplReset=repl_reset
`;

let pyState = null;
const pyWait = [];
/** The folder the site is served from, worked out from the page address. */
const siteBase = () => location.href.split("#")[0].replace(/[^/]*$/, "");

export const pythonReady = () => pyState === "ready";
export function loadPython(cb) {
  if (pyState === "ready") return cb(true);
  if (pyState === "failed") return cb(false);
  pyWait.push(cb);
  if (pyState === "loading") return;
  pyState = "loading";
  const finish = ok => { pyState = ok ? "ready" : "failed"; pyWait.splice(0).forEach(f => f(ok)); };
  const start = () => {
    try {
      /* global __BRYTHON__, brython */
      if (!__BRYTHON__.brython_path) __BRYTHON__.brython_path = siteBase();
      brython({ debug: 0 });
      __BRYTHON__.runPythonSource(PY_HARNESS, "eaas_harness");
      finish(typeof window.eaasExec === "function");
    } catch (e) { finish(false); }
  };
  if (window.__BRYTHON__ && window.brython) return start();
  const add = src => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  add(siteBase() + "vendor/brython.min.js").then(() => add(siteBase() + "vendor/brython_mini_stdlib.js")).then(start).catch(() => finish(false));
}
/** Run fn, collecting what the Python harness writes, split into all, out and err. */
export function pyCapture(fn) {
  const out = [];
  window.eaasOut = (k, t) => out.push([k, String(t)]);
  try { fn(); } catch (e) { out.push(["err", "The practice runner stopped: " + e + "\n"]); }
  return { all: out.map(x => x[1]).join(""), out: out.filter(x => x[0] === "out").map(x => x[1]).join(""), err: out.filter(x => x[0] === "err").map(x => x[1]).join("") };
}
export const runProgram = (code, inputs) => pyCapture(() => window.eaasExec(code, inputs));
export const runLine = line => pyCapture(() => window.eaasRepl(line));
export const resetPrompt = () => { if (window.eaasReplReset) window.eaasReplReset(); };
