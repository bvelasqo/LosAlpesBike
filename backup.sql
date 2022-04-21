CREATE TABLE IF NOT EXISTS public."Categorias" (id SERIAL NOT NULL,
                                                                           nombre text COLLATE pg_catalog."default" NOT NULL,
                                                                                                                    CONSTRAINT "Categorias_pkey" PRIMARY KEY (id));
ALTER TABLE IF EXISTS public."Categorias" OWNER to postgres;

COMMENT ON TABLE public."Categorias" IS 'Categorias de los productos de LAB';

CREATE TABLE public."Productos" (codigo bigserial NOT NULL,
                                                  nombre text NOT NULL,
                                                              precio integer NOT NULL,
                                                                             caracteristicas text, stock integer NOT NULL,
                                                                                                                 estado text NOT NULL,
                                                                                                                             categoria bigint NOT NULL,
                                                                                                                                              PRIMARY KEY (codigo), CONSTRAINT fk_categoria
                                 FOREIGN KEY(categoria) REFERENCES public."Categorias"(id));
ALTER TABLE IF EXISTS public."Productos" OWNER to postgres;

COMMENT ON TABLE public."Productos" IS 'Productos LAB';

CREATE TABLE public."Ventas"
    (codigo bigserial NOT NULL,
                      cantidad integer NOT NULL,
                                       precio_total integer NOT NULL,
                                                            producto bigint, PRIMARY KEY (codigo), CONSTRAINT fk_productos
     FOREIGN KEY (producto) REFERENCES public."Productos" (codigo) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID);


ALTER TABLE IF EXISTS public."Ventas" OWNER to postgres;

COMMENT ON TABLE public."Ventas" IS 'Ventas de LAB';

COMMENT ON COLUMN public."Ventas".producto IS 'FK';


ALTER TABLE IF EXISTS public."Productos" ADD COLUMN foto text;

COMMENT ON COLUMN public."Productos".foto IS 'foto del producto';