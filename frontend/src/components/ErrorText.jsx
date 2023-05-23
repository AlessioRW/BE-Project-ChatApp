
export function ErrorText({text, state}){

    return (
        <section className="error-text">
            {state === true && 
                <h4>{text}</h4>
            }
        </section>
    )
}