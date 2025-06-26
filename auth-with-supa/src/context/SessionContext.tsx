import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../helper/supaBaseClient";
import type { Session } from "@supabase/supabase-js";

const SessionContext = createContext<{
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
}>({
  session: null,
  loading: true,
  logout: async () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Çıkış yapılırken hata:", error);
        throw error;
      }
      console.log("Başarıyla çıkış yapıldı");
    } catch (error) {
      console.error("Çıkış yapılırken beklenmeyen hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    // İlk session'ı al
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session alınırken hata:", error);
        } else {
          console.log("Mevcut session:", data.session);
          setSession(data.session);
        }
      } catch (error) {
        console.error("Session alınırken beklenmeyen hata:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Auth state değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state değişti:", event, session);
        setSession(session);
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
