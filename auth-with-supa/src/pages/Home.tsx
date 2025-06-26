import React from "react";
import { useSession } from "../context/SessionContext";

const Home = () => {
  const { session, loading, logout } = useSession();

  const handleLogout = async () => {
    try {
      await logout();
      // Logout başarılı olduğunda kullanıcı otomatik olarak ana sayfaya yönlendirilecek
      // çünkü session state değişecek ve component yeniden render olacak
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
      // Hata durumunda kullanıcıya bilgi verebilirsiniz
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg
                className="logo-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="logo-text">AuthApp</h1>
          </div>
          {session && (
            <div className="user-info">
              <span className="welcome-text">Hoş geldiniz,</span>
              <div className="user-badge">
                <div className="user-avatar">
                  <span className="user-initial">
                    {session.user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="user-email">{session.user.email}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        {session ? (
          // Logged in state
          <div className="logged-in-content">
            <div className="welcome-section">
              <div className="success-icon">
                <svg
                  className="success-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="welcome-title">Başarıyla Giriş Yaptınız! 🎉</h2>
              <p className="welcome-subtitle">
                Hoş geldiniz! Artık uygulamamızın tüm özelliklerine
                erişebilirsiniz.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon security-icon">
                  <svg
                    className="feature-svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="feature-title">Güvenli Erişim</h3>
                <p className="feature-description">
                  Hesabınız güvenli bir şekilde korunuyor.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon performance-icon">
                  <svg
                    className="feature-svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="feature-title">Hızlı Performans</h3>
                <p className="feature-description">
                  Optimize edilmiş deneyim sunuyoruz.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon user-friendly-icon">
                  <svg
                    className="feature-svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="feature-title">Kullanıcı Dostu</h3>
                <p className="feature-description">Kolay ve sezgisel arayüz.</p>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={handleLogout} className="logout-button">
                <svg
                  className="button-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </div>
        ) : (
          // Not logged in state
          <div className="welcome-content">
            <div className="hero-section">
              <div className="hero-icon">
                <svg
                  className="hero-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="hero-title">Hoş Geldiniz</h2>
              <p className="hero-subtitle">
                Güvenli ve hızlı kimlik doğrulama sistemi ile hesabınıza erişin.
                Modern teknolojiler kullanarak geliştirilmiş bu platform size en
                iyi deneyimi sunar.
              </p>
            </div>

            <div className="auth-cards">
              <div className="auth-card signin-card">
                <div className="auth-icon signin-icon">
                  <svg
                    className="auth-svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <h3 className="auth-title">Zaten Hesabınız Var mı?</h3>
                <p className="auth-description">
                  Mevcut hesabınızla giriş yapın ve tüm özelliklere erişim
                  sağlayın.
                </p>
                <button
                  onClick={() => (window.location.href = "/signin")}
                  className="auth-button signin-button"
                >
                  Giriş Yap
                </button>
              </div>

              <div className="auth-card signup-card">
                <div className="auth-icon signup-icon">
                  <svg
                    className="auth-svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h3 className="auth-title">Yeni misiniz?</h3>
                <p className="auth-description">
                  Hemen ücretsiz hesap oluşturun ve platformumuzun
                  avantajlarından yararlanın.
                </p>
                <button
                  onClick={() => (window.location.href = "/signup")}
                  className="auth-button signup-button"
                >
                  Kayıt Ol
                </button>
              </div>
            </div>

            <div className="features-section">
              <h3 className="features-title">Neden Bizi Seçmelisiniz?</h3>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-item-icon security-item-icon">
                    <svg
                      className="feature-item-svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="feature-item-title">Güvenlik</h4>
                  <p className="feature-item-description">
                    En yüksek güvenlik standartları
                  </p>
                </div>
                <div className="feature-item">
                  <div className="feature-item-icon speed-item-icon">
                    <svg
                      className="feature-item-svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="feature-item-title">Hız</h4>
                  <p className="feature-item-description">
                    Anında erişim ve hızlı işlem
                  </p>
                </div>
                <div className="feature-item">
                  <div className="feature-item-icon ease-item-icon">
                    <svg
                      className="feature-item-svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="feature-item-title">Kullanım Kolaylığı</h4>
                  <p className="feature-item-description">
                    Sezgisel ve kullanıcı dostu
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
