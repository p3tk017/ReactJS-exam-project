import { Link } from "react-router";

export default function Home() {
    return (
        <>
            <section className="hero">
                <h1>Discover Your Signature Scent</h1>
                <p>Explore our collection of premium colognes.</p>
                <Link id="button" to="/catalog">View Now</Link>
            </section>
        
            <section className="products">
                <h2>Featured Colognes</h2>
                <div className="product-grid">
                    <div className="product">
                        <img src="https://cdn.notinoimg.com/detail_main_mq/armani/3614272225718_01-o/emporio-stronger-with-you-intensely___190118.jpg" alt="Cologne" />
                        <h3>Emporio Armani</h3>
                        <p>Stronger With You Intensly</p>
                        <p className="productPrice">$119.99</p>
                    </div>
                    <div className="product">
                        <img src="https://cdn.notinoimg.com/detail_main_mq/xerjoff/2800018180231_01-o/erba-pura___240808.jpg" alt="Cologne" />
                        <h3>Xerjoff</h3>
                        <p>Ebra Pura</p>
                        <p className="productPrice">$228.99</p>
                    </div>
                    <div className="product">
                        <img src="https://cdn.notinoimg.com/detail_main_mq/montale/mntincu_aedp10_01-o/intense-cafe___150210.jpg" alt="Cologne" />
                        <h3>Montale</h3>
                        <p>Intense Cafe</p>
                        <p className="productPrice">$179.99</p>
                    </div>
                </div>
            </section>
        </>
    )
}