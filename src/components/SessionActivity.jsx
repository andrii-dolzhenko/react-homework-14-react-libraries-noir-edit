import { useCallback, useEffect, useState } from 'react'
import { FiActivity, FiClock, FiRefreshCw } from 'react-icons/fi'
import { useIdleTimer } from 'react-idle-timer'
import { toast } from 'react-toastify'

const SESSION_TIMEOUT = 20_000
const SESSION_SECONDS = SESSION_TIMEOUT / 1000
const COUNTDOWN_INTERVAL = 250

export default function SessionActivity() {
  const [isIdle, setIsIdle] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(SESSION_SECONDS)

  const handleIdle = useCallback(() => {
    setIsIdle(true)
    setRemainingSeconds(0)
    toast.warning('Session paused after 20 seconds of inactivity.')
  }, [])

  const handleActive = useCallback(() => {
    setIsIdle(false)
    toast.success('Welcome back — session resumed.')
  }, [])

  const { getRemainingTime, reset } = useIdleTimer({
    timeout: SESSION_TIMEOUT,
    throttle: 500,
    onIdle: handleIdle,
    onActive: handleActive,
  })

  useEffect(() => {
    const updateCountdown = () => {
      if (isIdle) {
        setRemainingSeconds(0)
        return
      }

      const seconds = Math.max(0, Math.ceil(getRemainingTime() / 1000))
      setRemainingSeconds(seconds)
    }

    updateCountdown()
    const intervalId = window.setInterval(updateCountdown, COUNTDOWN_INTERVAL)

    return () => window.clearInterval(intervalId)
  }, [getRemainingTime, isIdle])

  const handleReset = () => {
    reset()
    setIsIdle(false)
    setRemainingSeconds(SESSION_SECONDS)
    toast.info('Session timer reset.')
  }

  const progress = Math.max(
    0,
    Math.min(100, (remainingSeconds / SESSION_SECONDS) * 100),
  )

  return (
    <aside className="session-activity" aria-labelledby="session-activity-title">
      <div className="session-activity__heading">
        <div>
          <p className="eyebrow">SESSION</p>
          <h2 id="session-activity-title">Session activity</h2>
        </div>

        <div
          className={`session-status ${isIdle ? 'is-idle' : 'is-active'}`}
          aria-live="polite"
        >
          <FiActivity aria-hidden="true" />
          <span>{isIdle ? 'Idle' : 'Active'}</span>
        </div>
      </div>

      <p className="session-activity__intro">
        React Idle Timer tracks inactivity without interrupting the shopping
        flow. Stay inactive for 20 seconds to pause the session, then interact
        with the page to resume it.
      </p>

      <div className="session-panel">
        <div className="session-countdown">
          <FiClock aria-hidden="true" />
          <div>
            <span>Time remaining</span>
            <strong>{remainingSeconds}s</strong>
          </div>
        </div>

        <div
          className={`session-progress ${remainingSeconds === 0 ? 'is-empty' : ''}`}
          role="progressbar"
          aria-label="Session time remaining"
          aria-valuemin="0"
          aria-valuemax={SESSION_SECONDS}
          aria-valuenow={remainingSeconds}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <button type="button" onClick={handleReset}>
          <FiRefreshCw aria-hidden="true" />
          Reset timer
        </button>
      </div>

      <p className="session-activity__note">
        Pointer, keyboard and scroll activity automatically restart the idle
        countdown. Toast notifications report session state changes.
      </p>
    </aside>
  )
}
