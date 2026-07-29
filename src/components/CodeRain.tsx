'use client'

import { useRef, useEffect } from 'react'

const CODE_TOKENS = [
    'const', 'let', 'var', '=>', '{ }', '[ ]', '( )', ';', '::', '&&', '||',
    'x =', 'i++', 'if (', '} else', 'return', 'null', 'true', 'false', '0x4F',
    'import', 'export', 'class', 'def', 'print(', 'lambda', 'yield', 'async',
    'await', 'try {', 'catch(e)', 'finally', '<div>', '</div>', 'useState()',
    'useEffect(', 'console.log', 'function()', 'new Promise', '.then(',
    '.map(x=>', '.filter(', 'JSON.stringify', 'fetch(', 'process.env',
    'public class', 'System.out', 'private void', 'int main()', '#include',
    'std::cout', 'std::vector', '<?php', '$_GET[', 'echo', 'SELECT *',
    'FROM users', 'WHERE id=', 'JOIN', 'INSERT INTO', 'fn main()', 'let mut',
    'impl Trait', 'match x {', 'package main', 'func main()', 'go func()',
    'chan int', '#!/bin/bash', 'echo $PATH', 'grep -r', 'git commit',
    'docker run', 'npm install', 'interface', 'extends', 'implements',
    '=== null', '!== undefined', '0b1010', 'while(1)', 'for(;;)', 'switch(x)',
]

const COLORS = ['#00ff9c', '#00e5ff', '#00b4d8', '#39ff14']

type Column = {
    x: number
    y: number
    speed: number
    tokens: string[]
    fontSize: number
    color: string
}

export default function CodeRain() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const fontSize = 13
        const lineGap = fontSize + 7
        const colWidth = 70
        let columnCount = Math.ceil(width / colWidth)

        const randomToken = () => CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)]
        const trailLength = 11

        const createColumn = (i: number): Column => ({
            x: i * colWidth + Math.random() * 12,
            y: -Math.random() * height,
            speed: 0.3 + Math.random() * 0.45,
            tokens: new Array(trailLength).fill('').map(() => randomToken()),
            fontSize,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })

        let columns: Column[] = new Array(columnCount).fill(0).map((_, i) => createColumn(i))

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
            columnCount = Math.ceil(width / colWidth)
            columns = new Array(columnCount).fill(0).map((_, i) => createColumn(i))
        }

        window.addEventListener('resize', handleResize)

        let animationId: number
        let frame = 0

        const draw = () => {
            frame++
            ctx.clearRect(0, 0, width, height)
            ctx.textBaseline = 'top'

            columns.forEach((col) => {
                if (frame % 20 === 0 && Math.random() > 0.55) {
                    const idx = Math.floor(Math.random() * col.tokens.length)
                    col.tokens[idx] = randomToken()
                }

                for (let i = 0; i < col.tokens.length; i++) {
                    const lineY = col.y - i * lineGap
                    if (lineY < -lineGap || lineY > height + lineGap) continue

                    const isHead = i === 0
                    const fade = 1 - i / col.tokens.length

                    ctx.font = `${isHead ? 'bold ' : ''}${col.fontSize}px 'Fira Code', 'Courier New', monospace`
                    ctx.globalAlpha = isHead ? 1 : fade * 0.7

                    if (isHead) {
                        ctx.fillStyle = '#ffffff'
                        ctx.shadowColor = col.color
                        ctx.shadowBlur = 10
                    } else {
                        ctx.fillStyle = col.color
                        ctx.shadowBlur = 0
                    }

                    ctx.fillText(col.tokens[i], col.x, lineY)
                }

                ctx.shadowBlur = 0
                ctx.globalAlpha = 1

                col.y += col.speed * 2.6

                if (col.y - col.tokens.length * lineGap > height) {
                    Object.assign(col, createColumn(Math.round(col.x / colWidth)))
                    col.y = -Math.random() * 300
                }
            })

            animationId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return <canvas ref={canvasRef} className="hero-code-rain" aria-hidden="true" />
}