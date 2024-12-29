<template>
    <div class='cm-code-block'>
        <pre class='cm-code-block__pre'>
            <code class='cm-code-block__code'>
                <slot />
            </code>
        </pre>
    </div>
</template>

<style lang='scss'>
.cm-code-block {
    display: flex;
    margin-bottom: 12px;
    border-radius: 6px;
    justify-content: space-between;
    background-color: var(--cm-bg-soft-color);
}

.cm-code-block__pre {
    flex: 1;
    margin: 0;
    display: flex;
    padding: 24px;
    overflow: auto;
    line-height: 1.45;
}

.cm-code-block__code {
    display: flex;
    flex-direction: column;
}
</style>