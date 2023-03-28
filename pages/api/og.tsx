import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { highlightFirstLetter } from 'utils/utils'

export const config = {
  runtime: 'edge'
}

export default function (req: NextRequest) {
  const { searchParams } = new URL(req.url)

  // ?abbreviation=<abbreviation>
  const title =
    searchParams.get('abbreviation')?.toUpperCase()?.slice(0, 10) || 'HST ABBR'

  // ?definition=<definition>
  const description =
    searchParams.get('definition')?.slice(0, 60) ||
    'A powerful abbreviation search engine for fun!'

  const highlightedDefinition = highlightFirstLetter(title, description)

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#000212',
          border: '2px solid #444B5C',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            marginTop: -25
          }}
        >
          <img
            alt="HST ABBR"
            style={{
              opacity: 0.65
            }}
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE5IiBoZWlnaHQ9IjE0MyIgdmlld0JveD0iMCAwIDIxOSAxNDMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMTMuMTA1IDg0LjcwNjdMMTYwLjk5NyA1NS41NDIxQzE2MS4wOTIgNTUuNDA1MiAxNjEuMiA1NS4yNjM1IDE2MS4zMDkgNTUuMTMxMkwxNzQuMTI1IDM5LjQxOTlDMTc0LjY0OSAzOC43NzI3IDE3NC42NTggMzcuODMyNyAxNzQuMTM0IDM3LjE3NjFDMTczLjYxIDM2LjUxMDEgMTcyLjY5MyAzNi4zMTE3IDE3MS45MzggMzYuNjg0OEwxNTMuNzQyIDQ1LjY2OTVDMTQ5LjM5NiA0Ny44MTQxIDE0NC4yIDQ3LjI1NjYgMTQwLjQxMSA0NC4yMjRDMTM2LjYxOCA0MS4yMDA4IDEzNC45MjIgMzYuMjU1IDEzNi4wNDYgMzEuNTM1OUwxNDAuNzggMTEuODIzNkMxNDAuOTgzIDExLjAwMTcgMTQwLjU3NiAxMC4xNTYxIDEzOS44MjEgOS43ODc2N0MxMzkuMDU1IDkuNDIzOTMgMTM4LjE0OCA5LjY0MTIzIDEzNy42MzMgMTAuMjk3OEwxMjUuMTQ5IDI2LjI3ODRDMTIyLjE2OCAzMC4xMDQ2IDExNy4yNDEgMzEuODU3MSAxMTIuNTA4IDMwLjc3MDdDMTA3Ljc3OSAyOS42ODg5IDEwNC4wOTkgMjUuOTY2NiAxMDMuMDc0IDIxLjIyODZMOTguNzgwNCAxLjQxMjQxQzk4LjYwMDkgMC41ODU3NDcgOTcuODczNSAwIDk3LjAzMjYgMEM5Ni4xOTE4IDAgOTUuNDU5NiAwLjU4NTc0NyA5NS4yODAxIDEuNDEyNDFMOTAuOTcyIDIxLjIxOTJDODkuOTM3NSAyNS45NTcxIDg2LjI1NzcgMjkuNjc0OCA4MS41MjkyIDMwLjc1NjVDNzYuODAwNyAzMS44MzgyIDcxLjg3ODUgMzAuMDc2MyA2OC44OTMxIDI2LjI1TDU2LjQzMTggMTAuMjY0OEM1NS45MTIyIDkuNTkzOTkgNTUuMDAwNSA5LjM4MTQyIDU0LjI0IDkuNzQ5ODdDNTMuNDc5NCAxMC4xMTgzIDUzLjA4MjYgMTAuOTYzOSA1My4yNzYzIDExLjc4NThMNTcuOTkwNiAzMS41MDc2QzU5LjExNDkgMzYuMjIxOSA1Ny40MTQzIDQxLjE2NzcgNTMuNjIxMSA0NC4xOTA5QzQ5LjgyOCA0Ny4yMTQxIDQ0LjYyNzEgNDcuNzcxNSA0MC4yODEyIDQ1LjYxNzVMMjIuMTEzNiAzNi42MTg3QzIxLjM1NzggMzYuMjUwMyAyMC40NDYxIDM2LjQ1MzQgMTkuOTIxNyAzNy4xMUMxOS41MTU1IDM3LjYxNTQgMTkuNDI1NyAzOC4yODYyIDE5LjY0NzggMzguODY3MkMxOS43MDQ0IDM5LjEyNyAxOS44MjI1IDM5LjM2NzkgMTkuOTkyNiAzOS41OUwzMi42MjQgNTUuNDQ3N0MzNS42NDI1IDU5LjI0MDkgMzYuMTk5OSA2NC40MzcgMzQuMDQ1OCA2OC43ODc2QzMzLjcxMDQgNjkuNDYzMSAzMy4zMjMxIDcwLjA5MTQgMzIuODgzOCA3MC42ODE4QzMwLjUxNzIgNzMuNzA5OCAyNi45NzkgNzUuNDUyOSAyMi45MDI0IDc1LjQ4MTJDMTguNDQ3OSA3NS41MTQzIDEuODcyMTggNzUuMzgyIDIuMzAyMDUgNzUuMzAxN0MxLjQ1NjQ5IDc1LjI2ODYgMC43MTk1ODEgNzUuODQ5NyAwLjUyMTE4MyA3Ni42NjIyQzAuMzI3NTA4IDc3LjQ4ODggMC43MjkwMjkgNzguMzM0NCAxLjQ4OTU2IDc4LjcwMjhMMTkuNzUxNyA4Ny41MTc0QzI0LjEyMTIgODkuNjE0NyAyNi44NzUxIDk0LjA2OTMgMjYuODE4NCA5OC45MDY0QzI2Ljc2NjUgMTAzLjc1OCAyMy45MTMzIDEwOC4xNDEgMTkuNDk2NiAxMTAuMTU4TDEuMDQwOCAxMTguNTQzQzAuMjg0OTk0IDExOC44OTcgLTAuMTM1NDIyIDExOS43MjkgMC4wMzkzNTc4IDEyMC41NTFDMC4yMTg4NjEgMTIxLjM4NyAwLjk0NjMyMyAxMjEuOTY4IDEuNzg3MTUgMTIxLjk2OEwzOS43NDc0IDEyMi4wNDhMMzQuMjY3OCAxMjcuNTIzQzMwLjg2MiAxMzAuOTI5IDMwLjg2MiAxMzYuNDU2IDM0LjI2NzggMTM5Ljg1MkMzNS45Njg0IDE0MS41NDggMzguMjAyNyAxNDIuMzk4IDQwLjQzMjQgMTQyLjM5OEM0Mi42NjY3IDE0Mi4zOTggNDQuODk2MyAxNDEuNTQ4IDQ2LjYwMTYgMTM5Ljg1Mkw2NC40MDU1IDEyMi4wMzlMMTI5LjYyNyAxMjIuMDYyTDE0Ny40MDcgMTM5Ljg1MkMxNDkuMTEyIDE0MS41NDggMTUxLjM0NyAxNDIuMzk4IDE1My41ODEgMTQyLjM5OEMxNTUuODE1IDE0Mi4zOTggMTU4LjAzNSAxNDEuNTQ4IDE1OS43NTUgMTM5Ljg1MkMxNjMuMTYxIDEzNi40NDIgMTYzLjE2MSAxMzAuOTE1IDE1OS43NTUgMTI3LjUyM0wxNTQuMzEzIDEyMi4wODZMMTcxLjEyNSAxMjIuMDkxQzE3NC4wOTYgMTIyLjA5NSAxNzYuNjggMTIwLjAzMSAxNzcuMzIzIDExNy4xMjFDMTc3LjgyOCAxMTQuODU5IDE3Ny4wNDQgMTEyLjU0NCAxNzUuMzk1IDExMS4wNDdMMjA5LjYzMyAxMDUuMTI4QzIxNC4yMiAxMDQuMzM5IDIxNy44MDUgMTAwLjczIDIxOC41OSA5Ni4xNzEzQzIxOS4zNTUgOTEuNTc1MSAyMTcuMTY4IDg2Ljk3ODkgMjEzLjEwNSA4NC43MDY3Wk0yMDkuOTc4IDk0LjY4MzRDMjA5LjgxMyA5NS42MjgxIDIwOS4wNjYgOTYuMzYwMyAyMDguMTEyIDk2LjUzOThMMTY3LjU4MiAxMDMuNTMxQzE2Ny43NDggOTkuODE4MSAxNjQuNjExIDc0Ljk4OTkgMTU4LjUzMSA2NC4xNTgzTDIwOC44MyA5Mi4zMTY3QzIwOS42ODUgOTIuNzg5MSAyMTAuMTM0IDkzLjczMzkgMjA5Ljk3OCA5NC42ODM0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE4MS4xNjggOTIuODg4M0MxODMuOTY3IDkyLjg4ODMgMTg2LjIzNiA5MC42MTkgMTg2LjIzNiA4Ny44MTk3QzE4Ni4yMzYgODUuMDIwNCAxODMuOTY3IDgyLjc1MTEgMTgxLjE2OCA4Mi43NTExQzE3OC4zNjggODIuNzUxMSAxNzYuMDk5IDg1LjAyMDQgMTc2LjA5OSA4Ny44MTk3QzE3Ni4wOTkgOTAuNjE5IDE3OC4zNjggOTIuODg4MyAxODEuMTY4IDkyLjg4ODNaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
            width={100}
            height={62}
          />
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 120,
            color: '#B4BCD0',
            lineHeight: 1.4,
            letterSpacing: 20,
            whiteSpace: 'pre-wrap'
          }}
        >
          {title}
        </div>
        <p
          style={{
            marginTop: -25,
            color: '#B4BCD0',
            fontSize: 65,
            letterSpacing: 1.5
          }}
        >
          {highlightedDefinition.map((token, index) => (
            <span style={{ margin: '0 12px' }} key={`token-${index}`}>
              {token.pre}
              <strong style={{ fontWeight: 800, color: '#eee' }}>
                {token.bold}
              </strong>
              {token.post}
            </span>
          ))}
        </p>
      </div>
    ),
    {
      width: 800,
      height: 400
    }
  )
}
